
using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface ICustomerService
    {
        Task<BaseResponse<List<CustomerDto>>> GetAllAsync(Expression<Func<Customer, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<BaseResponse<CustomerDto>> GetOneAsync(Expression<Func<Customer, bool>> filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
    }
}
