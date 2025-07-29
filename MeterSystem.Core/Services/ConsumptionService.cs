using MeterSystem.Core.DTOs.Consumption;
using MeterSystem.Core.Mapping;
using MeterSystem.Core.Responses;
using MeterSystem.Core.Services.Base;
using MeterSystem.Core.Services.Interfaces;
using MeterSystem.Domain.Interfaces;

namespace MeterSystem.Core.Services
{
    public class ConsumptionService : BaseService, IConsumptionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ConsumptionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<Guid>> CreateAsync(CreateConsumptionDto dto)
        {
            if (dto.CurrentReading < dto.PreviousReading)
                return Fail<Guid>("Current reading must be greater than or equal to previous reading.");

            if (dto.MeterId == Guid.Empty)
                return Fail<Guid>("Meter ID is required.");

            var entity = dto.ToEntity();

            await _unitOfWork.Consumptions.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(entity.Id, "Consumption created successfully.");
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            var entity = await _unitOfWork.Consumptions.GetOneAsync(x => x.Id == id);
            if (entity is null)
                return Fail<bool>("Consumption not found");

            await _unitOfWork.Consumptions.DeleteAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Consumption deleted successfully.");
        }

        public async Task<BaseResponse<List<ConsumptionDto>>> GetAllAsync()
        {
            var entities = await _unitOfWork.Consumptions.GetAllAsync();
            var result = entities.Select(e => e.ToDto()).ToList();
            return Success(result);
        }

        public async Task<BaseResponse<ConsumptionDto>> GetByIdAsync(Guid id)
        {
            var entity = await _unitOfWork.Consumptions.GetOneAsync(x => x.Id == id);
            return entity is null
                ? Fail<ConsumptionDto>("Not found")
                : Success(entity.ToDto());
        }

        public async Task<BaseResponse<List<ConsumptionDto>>> GetByMeterIdAsync(Guid meterId)
        {
            var entities = await _unitOfWork.Consumptions.GetAllAsync(x => x.MeterId == meterId);

            var result = entities.Select(e => e.ToDto()).ToList();

            return result.Count == 0
                ? Fail<List<ConsumptionDto>>("No consumption records found for this meter.")
                : Success(result);
        }


        public async Task<BaseResponse<bool>> UpdateAsync(UpdateConsumptionDto dto)
        {
            if (dto.CurrentReading < dto.PreviousReading)
                return Fail<bool>("Current reading must be greater than or equal to previous reading.");

            if (dto.MeterId == Guid.Empty)
                return Fail<bool>("Meter ID is required.");

            var entity = await _unitOfWork.Consumptions.GetOneAsync(x => x.Id == dto.Id);
            if (entity is null)
                return Fail<bool>("Consumption not found");

            entity.MapToEntity(dto);
            await _unitOfWork.Consumptions.UpdateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Consumption updated successfully.");
        }
    }
}
