using MeterSystem.Domain.Base;
using System.Linq.Expressions;

namespace MeterSystem.Common.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T?> GetOneAsync(Expression<Func<T,bool>> filter, bool isTracking = false , bool ignoreQueryFilters = false, string? props = null);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task SoftDelete(T entity);
        Task Recover(T entity);
        Task<string> GetLastCustomerCodeAsync();
    }
}
