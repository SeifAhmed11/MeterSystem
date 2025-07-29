using System.Linq.Expressions;

namespace MeterSystem.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetOneAsync(Expression<Func<T,bool>>? filter = null, bool isTracking = false , string? props = null);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, bool isTracking = false, string? props = null);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
