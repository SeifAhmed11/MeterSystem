using MeterSystem.Core.DTOs.Customer;
using MeterSystem.Core.Responses;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;


namespace MeterSystem.Core.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<BaseResponse<List<CustomerDto>>> GetAllAsync();
        Task<BaseResponse<List<CustomerDto>>> GetAllFilterByNameAsync(string name);
        Task<BaseResponse<CustomerDto>> GetByIdAsync(Guid id);
        Task<BaseResponse<CustomerDto>> GetByNationalIdAsync(string natId);
        Task<BaseResponse<CustomerDto>> GetByMeterSerialAsync(string serial);
        Task<BaseResponse<CustomerDto>> GetByCustomerCodeAsync(string code);
        Task<BaseResponse<CustomerDto>> GetByRechargeIdAsync(Guid rechargeId);
        Task<BaseResponse<Guid>> CreateAsync(CreateCustomerDto dto);
        Task<BaseResponse<CustomerDto>> UpdateAsync(UpdateCustomerDto dto);
        Task<BaseResponse<CustomerDto>> DeleteAsync(Guid id);
    }
}
