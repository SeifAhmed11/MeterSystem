using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Consumption;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Mapping;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;

namespace MeterSystem.Core.Services
{
    public class ConsumptionService 
    {
        private readonly IUnitOfWork _unitOfWork;

        public ConsumptionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //public async Task<BaseResponse<Guid>> CreateAsync(CreateConsumptionDto dto)
        //{
        //    try
        //    {
        //        if (dto == null)
        //            return BaseResponse<Guid>.FailResult(Messages.Required("DTO"));

        //        if (dto.CurrentReading < dto.PreviousReading)
        //            return BaseResponse<Guid>.FailResult(Messages.MustBeGreaterOrEqual("Current Reading", "Previous Reading"));

        //        var entity = dto.ToEntity();
        //        await _unitOfWork.Consumptions.AddAsync(entity);
        //        await _unitOfWork.SaveChangesAsync();

        //        return BaseResponse<Guid>.SuccessResult(entity.Id, Messages.Created("Consumption"));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BaseResponse<Guid>.FailResult($"Unexpected error: {ex.Message}");
        //    }
        //}

        //public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        //{
        //    try
        //    {
        //        var entity = await _unitOfWork.Consumptions.GetOneAsync(x => x.Id == id);
        //        if (entity == null)
        //            return BaseResponse<bool>.FailResult(Messages.NotFound("Consumption"));

        //        await _unitOfWork.Consumptions.DeleteAsync(entity);
        //        await _unitOfWork.SaveChangesAsync();

        //        return BaseResponse<bool>.SuccessResult(true, Messages.Deleted("Consumption"));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BaseResponse<bool>.FailResult($"Unexpected error: {ex.Message}");
        //    }
        //}

        //public async Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync(Expression<Func<ConsumptionDto, bool>> filter = null, bool isTracking = false, string? props = null)
        //{
        //    try
        //    {
        //        var entities = await _unitOfWork.Consumptions.GetAllAsync(null, isTracking, props);
        //        var dtos = entities.Select(x => x.ToDto()).ToList();

        //        if (filter != null)
        //            dtos = dtos.AsQueryable().Where(filter).ToList();

        //        return BaseResponse<List<ConsumptionDto>>.SuccessResult(dtos);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BaseResponse<List<ConsumptionDto>>.FailResult($"Unexpected error: {ex.Message}");
        //    }
        //}

        //public async Task<BaseResponse<ConsumptionDto>> GetByOneAsync(Expression<Func<ConsumptionDto, bool>>? filter = null, bool isTracking = false, string? props = null)
        //{
        //    try
        //    {
        //        var entities = await _unitOfWork.Consumptions.GetAllAsync(null, isTracking, props);
        //        var dtos = entities.Select(x => x.ToDto()).AsQueryable();

        //        var result = filter == null ? dtos.FirstOrDefault() : dtos.FirstOrDefault(filter);
        //        return result == null
        //            ? BaseResponse<ConsumptionDto>.FailResult(Messages.NotFound("Consumption"))
        //            : BaseResponse<ConsumptionDto>.SuccessResult(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BaseResponse<ConsumptionDto>.FailResult($"Unexpected error: {ex.Message}");
        //    }
        //}

        //public async Task<BaseResponse<bool>> UpdateAsync(UpdateConsumptionDto dto)
        //{
        //    try
        //    {
        //        var entity = await _unitOfWork.Consumptions.GetOneAsync(x => x.Id == dto.Id);
        //        if (entity == null)
        //            return BaseResponse<bool>.FailResult(Messages.NotFound("Consumption"));

        //        entity.MapToEntity(dto);
        //        await _unitOfWork.Consumptions.UpdateAsync(entity);
        //        await _unitOfWork.SaveChangesAsync();

        //        return BaseResponse<bool>.SuccessResult(true, Messages.Updated("Consumption"));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BaseResponse<bool>.FailResult($"Unexpected error: {ex.Message}");
        //    }
        //}
    }
}
