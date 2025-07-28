using MeterSystem.Domain.Interfaces;
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
        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter, bool isTracking = false, string? props = null)
        {
            if (filter == null) 
            {
                return await _dbSet.ToListAsync();
            }
            var Data = _dbSet.Where(filter);
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

        public async Task<T?> GetOneAsync(Expression<Func<T, bool>> filter , bool isTracking = false, string? props = null)
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
    }
}
