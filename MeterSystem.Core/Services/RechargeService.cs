using MeterSystem.Core.DTOs.Recharge;
using MeterSystem.Core.Mapping;
using MeterSystem.Core.Responses;
using MeterSystem.Core.Services.Base;
using MeterSystem.Domain.Interfaces;
using MeterSystem.Domain.Interfaces.IServices;

namespace MeterSystem.Application.Services
{
    public class RechargeService : BaseService, IRechargeService
    {
        private readonly IUnitOfWork _unitOfWork;

        public RechargeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<RechargeDto>> GetByIdAsync(Guid id)
        {
            var entity = await _unitOfWork.Recharges.GetOneAsync(r => r.Id == id, props: "Meter,Customer");
            return entity is null
                ? Fail<RechargeDto>("Recharge not found")
                : Success(entity.ToDto());
        }

        public async Task<BaseResponse<List<RechargeDto>>> GetAllAsync()
        {
            var entities = await _unitOfWork.Recharges.GetAllAsync(props: "Meter,Customer");
            var dtos = entities.Select(r => r.ToDto()).ToList();
            return Success(dtos);
        }

        public async Task<BaseResponse<List<RechargeDto>>> GetByMeterIdAsync(Guid meterId)
        {
            if (meterId == Guid.Empty)
                return Fail<List<RechargeDto>>("Invalid Meter ID");

            var recharges = await _unitOfWork.Recharges.GetAllAsync(r => r.MeterId == meterId, props: "Meter,Customer");
            var dtos = recharges.Select(r => r.ToDto()).ToList();
            return Success(dtos);
        }

        public async Task<BaseResponse<List<RechargeDto>>> GetByCustomerIdAsync(Guid customerId)
        {
            if (customerId == Guid.Empty)
                return Fail<List<RechargeDto>>("Invalid Customer ID");

            var recharges = await _unitOfWork.Recharges.GetAllAsync(r => r.CustomerId == customerId, props: "Meter,Customer");
            var dtos = recharges.Select(r => r.ToDto()).ToList();
            return Success(dtos);
        }

        public async Task<BaseResponse<bool>> CreateAsync(CreateRechargeDto dto)
        {
            if (dto.Amount <= 0)
                return Fail<bool>("Amount must be greater than zero.");

            if (dto.RechargeDate == default)
                return Fail<bool>("Recharge date is required.");

            if (dto.MeterId == Guid.Empty || dto.CustomerId == Guid.Empty)
                return Fail<bool>("Meter and Customer are required.");

            var entity = dto.ToEntity();
            await _unitOfWork.Recharges.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Recharge created successfully.");
        }

        public async Task<BaseResponse<bool>> UpdateAsync(UpdateRechargeDto dto)
        {
            if (dto.Id == Guid.Empty)
                return Fail<bool>("Recharge ID is required.");

            var entity = await _unitOfWork.Recharges.GetOneAsync(x => x.Id == dto.Id);
            if (entity is null)
                return Fail<bool>("Recharge not found");

            if (dto.Amount <= 0)
                return Fail<bool>("Amount must be greater than zero.");

            if (dto.RechargeDate == default)
                return Fail<bool>("Recharge date is required.");

            if (dto.MeterId == Guid.Empty || dto.CustomerId == Guid.Empty)
                return Fail<bool>("Meter and Customer are required.");

            dto.MapToEntity(entity);
            await _unitOfWork.Recharges.UpdateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return Success(true, "Recharge updated successfully.");
        }
    }
}
