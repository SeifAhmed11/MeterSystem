using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Meter;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Services
{
    public class MeterService : IMeterService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MeterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<MeterDto>> CreateAsync(CreateMeterDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<MeterDto>.FailResult(StaticMessages.Required);

                var entity = dto.ToEntity();
                await _unitOfWork.Repository<Meter>().AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<MeterDto>.SuccessResult(entity.ToDto(), StaticMessages.Created);
            }
            catch (Exception ex)
            {
                return BaseResponse<MeterDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Meter>().GetOneAsync(x => x.Id == id);
                if (entity == null)
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);

                await _unitOfWork.Repository<Meter>().DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex)
            {
                return BaseResponse<bool>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<MeterDto>>> GetAllAsync(Expression<Func<Meter, bool>>? filter = null, bool isTracking = false, string? props = null)
        {
            try
            {
                var meters = await _unitOfWork.Repository<Meter>().GetAllAsync(filter, isTracking, props);
                var dtos = meters.Select(x => x.ToDto()).ToList();
                return BaseResponse<List<MeterDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<MeterDto>>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<MeterDto>> GetByOneAsync(Expression<Func<Meter, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Meter>().GetOneAsync(filter, isTracking, props);
                return entity == null
                    ? BaseResponse<MeterDto>.FailResult(StaticMessages.NotFound)
                    : BaseResponse<MeterDto>.SuccessResult(entity.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<MeterDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<MeterDto>> UpdateAsync(UpdateMeterDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<MeterDto>.FailResult(StaticMessages.Required);

                var entity = await _unitOfWork.Repository<Meter>().GetOneAsync(x => x.Id == dto.Id);
                if (entity == null)
                    return BaseResponse<MeterDto>.FailResult(StaticMessages.NotFound);

                dto.MapToEntity(entity);
                await _unitOfWork.Repository<Meter>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<MeterDto>.SuccessResult(entity.ToDto(), StaticMessages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<MeterDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }
    }
}
