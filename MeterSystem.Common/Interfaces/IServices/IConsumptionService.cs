//using System.Linq.Expressions;
//using MeterSystem.Common.DTOs.Consumption;
//using MeterSystem.Common.Responses;
//using MeterSystem.Domain.Entities;

//namespace MeterSystem.Common.Interfaces.IServices
//{
//    public interface IConsumptionService
//    {
//        Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync(Expression<Func<Consumption, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
//        Task<BaseResponse<ConsumptionDto>> GetByOneAsync(Expression<Func<Consumption, bool>> filter, bool isTracking = false, string? props = null);
//        Task<BaseResponse<ConsumptionDto>> CreateAsync(CreateConsumptionDto dto);
//        Task<BaseResponse<ConsumptionDto>> UpdateAsync(UpdateConsumptionDto dto);
//        Task<BaseResponse<bool>> DeleteAsync(Guid id);
//    }
//}
