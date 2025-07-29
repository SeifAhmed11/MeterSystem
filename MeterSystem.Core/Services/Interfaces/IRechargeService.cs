using MeterSystem.Core.DTOs.Recharge;
using MeterSystem.Core.Responses;

namespace MeterSystem.Domain.Interfaces.IServices
{
    public interface IRechargeService
    {
        Task<BaseResponse<RechargeDto>> GetByIdAsync(Guid id);
        Task<BaseResponse<List<RechargeDto>>> GetAllAsync();
        Task<BaseResponse<List<RechargeDto>>> GetByMeterIdAsync(Guid meterId);
        Task<BaseResponse<List<RechargeDto>>> GetByCustomerIdAsync(Guid customerId);
        Task<BaseResponse<bool>> CreateAsync(CreateRechargeDto dto);
        Task<BaseResponse<bool>> UpdateAsync(UpdateRechargeDto dto);
    }
}
