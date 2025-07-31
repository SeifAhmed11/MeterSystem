using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Consumption;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using MeterSystem.Common.Mapping;

namespace MeterSystem.Core.Services
{
    public class ConsumptionService : IConsumptionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ConsumptionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<ConsumptionDto>> CreateAsync(CreateConsumptionDto dto)
        {
            try
            {
                if (dto is null)
                    return BaseResponse<ConsumptionDto>.FailResult(StaticMessages.Required);

                if (dto.CurrentReading < dto.PreviousReading)
                    return BaseResponse<ConsumptionDto>.FailResult(StaticMessages.Invalid);

                var entity = dto.ToEntity();
                await _unitOfWork.Repository<Consumption>().AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ConsumptionDto>.SuccessResult(entity.ToDto(), StaticMessages.Created);
            }
            catch (Exception ex)
            {
                return BaseResponse<ConsumptionDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Consumption>().GetOneAsync(x => x.Id == id);
                if (entity is null)
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);

                await _unitOfWork.Repository<Consumption>().DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex)
            {
                return BaseResponse<bool>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync(Expression<Func<Consumption, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var entities = await _unitOfWork.Repository<Consumption>().GetAllAsync(filter, isTracking, ignoreQueryFilters, props);
                var dtos = entities.Select(e => e.ToDto()).ToList();
                return BaseResponse<List<ConsumptionDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<ConsumptionDto>>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ConsumptionDto>> GetByOneAsync(Expression<Func<Consumption, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Consumption>().GetOneAsync(filter, isTracking, props);
                if (entity is null)
                    return BaseResponse<ConsumptionDto>.FailResult(StaticMessages.NotFound);

                return BaseResponse<ConsumptionDto>.SuccessResult(entity.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<ConsumptionDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ConsumptionDto>> UpdateAsync(UpdateConsumptionDto dto)
        {
            try
            {
                if (dto is null)
                    return BaseResponse<ConsumptionDto>.FailResult(StaticMessages.Required);

                var entity = await _unitOfWork.Repository<Consumption>().GetOneAsync(x => x.Id == dto.Id);
                if (entity is null)
                    return BaseResponse<ConsumptionDto>.FailResult(StaticMessages.NotFound);

                entity.MapToEntity(dto);
                await _unitOfWork.Repository<Consumption>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ConsumptionDto>.SuccessResult(entity.ToDto(), StaticMessages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<ConsumptionDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }
    }
}
