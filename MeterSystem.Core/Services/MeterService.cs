using MeterSystem.Core.DTOs.Meter;
using MeterSystem.Core.Mapping;
using MeterSystem.Core.Responses;
using MeterSystem.Core.Services.Base;
using MeterSystem.Core.Services.Interfaces;
using MeterSystem.Domain.Interfaces;

namespace MeterSystem.Core.Services
{
    public class MeterService : BaseService, IMeterService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MeterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<MeterDto>> GetByIdAsync(Guid id)
        {
            var entity = await _unitOfWork.Meters.GetOneAsync(x => x.Id == id, props: "Recharges,Consumptions");

            return entity is null
                ? Fail<MeterDto>("Meter not found")
                : Success(entity.ToDto());
        }

        public async Task<BaseResponse<MeterDto>> GetBySerialAsync(string serial)
        {
            if (string.IsNullOrWhiteSpace(serial))
                return Fail<MeterDto>("Serial is required.");

            var entity = await _unitOfWork.Meters.GetOneAsync(x => x.Serial == serial, props: "Recharges,Consumptions");

            return entity is null
                ? Fail<MeterDto>("Meter not found with this serial")
                : Success(entity.ToDto());
        }

        public async Task<BaseResponse<MeterDto>> GetByContractIdAsync(Guid contractId)
        {
            if (contractId == Guid.Empty)
                return Fail<MeterDto>("Contract ID is required.");

            var entity = await _unitOfWork.Meters.GetOneAsync(
                x => x.Contract != null && x.Contract.Id == contractId,
                props: "Contract,Recharges,Consumptions");

            return entity is null
                ? Fail<MeterDto>("Meter not found for this contract")
                : Success(entity.ToDto());
        }

        public async Task<BaseResponse<List<MeterDto>>> GetAllAsync()
        {
            var entities = await _unitOfWork.Meters.GetAllAsync(props: "Recharges,Consumptions");
            var dtos = entities.Select(e => e.ToDto()).ToList();

            return Success(dtos);
        }

        public async Task<BaseResponse<bool>> CreateAsync(CreateMeterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Serial))
                return Fail<bool>("Serial is required.");

            if (string.IsNullOrWhiteSpace(dto.Type))
                return Fail<bool>("Type is required.");

            if (dto.InstalledDate == default)
                return Fail<bool>("Installed date is required.");

            var entity = dto.ToEntity();

            await _unitOfWork.Meters.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Meter created successfully.");
        }

        public async Task<BaseResponse<bool>> UpdateAsync(UpdateMeterDto dto)
        {
            if (dto.Id == Guid.Empty)
                return Fail<bool>("Meter ID is required.");

            var entity = await _unitOfWork.Meters.GetOneAsync(x => x.Id == dto.Id);
            if (entity is null)
                return Fail<bool>("Meter not found");

            if (string.IsNullOrWhiteSpace(dto.Type))
                return Fail<bool>("Type is required.");

            if (dto.InstalledDate == default)
                return Fail<bool>("Installed date is required.");

            dto.MapToEntity(entity);

            await _unitOfWork.Meters.UpdateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Meter updated successfully.");
        }
    }
}
