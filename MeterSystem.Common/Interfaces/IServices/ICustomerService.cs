
using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface ICustomerService
    {
        Task<BaseResponse<List<CustomerDto>>> GetAllAsync(Expression<Func<Customer, bool>>? filter = null, bool isTracking = false, string? props = null);
        Task<BaseResponse<CustomerDto>> GetOneAsync(Expression<Func<Customer, bool>> filter, bool isTracking = false, string? props = null);
        Task<BaseResponse<CustomerDto>> CreateAsync(CreateCustomerDto dto);
        Task<BaseResponse<CustomerDto>> UpdateAsync(UpdateCustomerDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
    }
}
