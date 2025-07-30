using System.Linq.Expressions;
using MeterSystem.Common.DTOs.Consumption;
using MeterSystem.Common.Responses;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IConsumptionService
    {
        Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync(Expression<Func<ConsumptionDto, bool>>? filter = null, bool isTracking = false, string? props = null);
        Task<BaseResponse<ConsumptionDto>> GetByOneAsync(Expression<Func<ConsumptionDto, bool>> filter, bool isTracking = false, string? props = null);
        Task<BaseResponse<Guid>> CreateAsync(CreateConsumptionDto dto);
        Task<BaseResponse<bool>> UpdateAsync(UpdateConsumptionDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
    }
}
