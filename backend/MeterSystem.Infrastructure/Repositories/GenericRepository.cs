using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces;
using MeterSystem.Domain.Base;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MeterSystem.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly MeterSystemDbContext _context;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(MeterSystemDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return Task.CompletedTask;
        }
        public Task SoftDelete(T entity)
        {
            entity.IsDeleted = true;
            entity.UpdatedAt = DateTime.UtcNow;
            _dbSet.Update(entity);

            //_dbSet.Entry(entity).Property("IsDeleted").CurrentValue = true;
            
            return Task.CompletedTask;
        }

        public Task Recover(T entity)
        {
            entity.IsDeleted = false;
            entity.UpdatedAt = DateTime.UtcNow;
            _dbSet.Update(entity);

            return Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            IQueryable<T> Data = _dbSet;

            if (ignoreQueryFilters)
                Data = Data.IgnoreQueryFilters();

            if (filter is not null) 
            {
                Data = Data.Where(filter);
            }
            if (isTracking)
                Data = Data.AsNoTracking();
            if (props is not null)
            {
                foreach (var item in props.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    Data = Data.Include(item.Trim());
                }
            }
            return await Data.ToListAsync();
        }

        public async Task<T?> GetOneAsync(Expression<Func<T, bool>> filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            IQueryable<T> Data = _dbSet;

            if (ignoreQueryFilters)
                Data = Data.IgnoreQueryFilters();

            if (isTracking)
                Data = Data.AsNoTracking();
            if(props is not null)
            {
                foreach (var item in props.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    Data = Data.Include(item.Trim());
                }
            }

            Data = Data.Where(filter);
            return await Data.FirstOrDefaultAsync();
        }

        public Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);   
            return Task.CompletedTask;
        }

        public async Task<string> GetLastCustomerCodeAsync()
        {
            var maxId = await _context.Set<Contract>().MaxAsync(c => (Guid?)c.Id);
            if (maxId == null)
                return "0000";

            var lastCustomer = await _context.Set<Contract>()
                .Where(c => c.Id == maxId.Value)
                .Select(c => c.CustomerCode)
                .FirstOrDefaultAsync();

            return lastCustomer ?? "0000";
        }

        public async Task<List<TEntity>> GetCustomerDetailsAsync<TEntity>(string storedProceduresName, params SqlParameter[] parameters)
            where TEntity : class
        {
            var sql = $"EXEC {storedProceduresName} {string.Join(", ", parameters.Select(p => p.ParameterName))}";
            return await _context.Set<TEntity>()
                .FromSqlRaw(sql, parameters)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
