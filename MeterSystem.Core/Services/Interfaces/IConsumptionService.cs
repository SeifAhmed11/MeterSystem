using MeterSystem.Core.DTOs.Consumption;
using MeterSystem.Core.Responses;

namespace MeterSystem.Core.Services.Interfaces
{
    public interface IConsumptionService
    {
        Task<BaseResponse<ConsumptionDto>> GetByIdAsync(Guid id);
        Task<BaseResponse<List<ConsumptionDto>>> GetByMeterIdAsync(Guid meterId);
        Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync();
        Task<BaseResponse<Guid>> CreateAsync(CreateConsumptionDto dto);
        Task<BaseResponse<bool>> UpdateAsync(UpdateConsumptionDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
    }
}
