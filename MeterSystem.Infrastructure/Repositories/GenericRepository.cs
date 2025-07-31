using MeterSystem.Common.Interfaces;
using MeterSystem.Domain.Base;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MeterSystem.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
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

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter, bool isTracking = false, string? props = null)
        {
            IQueryable<T> Data = _dbSet;
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

        public async Task<T?> GetOneAsync(Expression<Func<T, bool>> filter, bool isTracking = false, string? props = null)
        {
            var Data = _dbSet.Where(filter);
            if (isTracking)
                Data = Data.AsNoTracking();
            if(props is not null)
            {
                foreach (var item in props.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    Data = Data.Include(item.Trim());
                }
            }
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
    }
}
