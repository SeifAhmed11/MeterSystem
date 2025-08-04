using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Recharge;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Application.Services
{
    public class RechargeService : IRechargeService
    {
        private readonly IUnitOfWork _unitOfWork;

        public RechargeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<RechargeDto>> CreateAsync(CreateRechargeDto dto)
        {
            try
            {
                if (dto.Amount <= 0)
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.Invalid);

                var meter = await _unitOfWork.Repository<Meter>().GetOneAsync(x => x.Id == dto.MeterId);
                if (meter == null)
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.NotFound);

                var entity = dto.ToEntity();
                await _unitOfWork.Repository<Recharge>().AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<RechargeDto>.SuccessResult(entity.ToDto(), StaticMessages.Created);
            }
            catch (Exception ex)
            {
                return BaseResponse<RechargeDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Recharge>().GetOneAsync(r => r.Id == id);
                if (entity == null)
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);

                await _unitOfWork.Repository<Recharge>().DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex)
            {
                return BaseResponse<bool>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<List<RechargeDto>>> GetAllAsync(Expression<Func<Recharge, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var entities = await _unitOfWork.Repository<Recharge>().GetAllAsync(filter, isTracking, ignoreQueryFilters, props);
                var dtos = entities.Select(r => r.ToDto()).ToList();
                return BaseResponse<List<RechargeDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<RechargeDto>>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<RechargeDto>> GetByOneAsync(Expression<Func<Recharge, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Recharge>().GetOneAsync(filter, isTracking, props);
                return entity == null
                    ? BaseResponse<RechargeDto>.FailResult(StaticMessages.NotFound)
                    : BaseResponse<RechargeDto>.SuccessResult(entity.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<RechargeDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<RechargeDto>> UpdateAsync(UpdateRechargeDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.Required);

                var entity = await _unitOfWork.Repository<Recharge>().GetOneAsync(r => r.Id == dto.Id);
                if (entity == null)
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.NotFound);

                dto.MapToEntity(entity);
                await _unitOfWork.Repository<Recharge>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<RechargeDto>.SuccessResult(entity.ToDto(), StaticMessages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<RechargeDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<RechargeDto>> GetLastCharge(string serial)
        {
            try
            {
                var allRecharges = await _unitOfWork.Repository<Recharge>()
                    .GetAllAsync(r => r.Meter.Serial == serial, isTracking: false, props: "Meter");

                if (allRecharges == null || !allRecharges.Any())
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.NotFound);

                var lastRecharge = allRecharges
                    .OrderByDescending(r => r.UpdatedAt)
                    .LastOrDefault();

                if (lastRecharge == null)
                    return BaseResponse<RechargeDto>.FailResult(StaticMessages.NotFound);

                return BaseResponse<RechargeDto>.SuccessResult(lastRecharge.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<RechargeDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<object>> GetByDateRangeAsync(string? serial, DateTime fromDate, DateTime toDate)
        {
            try
            {
                DateTime to = toDate.Date.AddDays(1).AddTicks(-1);

                Expression<Func<Recharge, bool>> filter = r =>
                    r.CreatedAt >= fromDate &&
                    r.CreatedAt <= to &&
                    (serial == null || r.Meter.Serial == serial);

                var recharges = await _unitOfWork.Repository<Recharge>()
                    .GetAllAsync(filter, isTracking: false, props: "Meter");

                if (recharges == null || !recharges.Any())
                    return BaseResponse<object>.FailResult(StaticMessages.NotFound);

                var dtos = recharges.Select(r => r.ToDto()).ToList();
                var totalAmount = recharges.Sum(r => r.Amount);

                var result = new
                {
                    TotalAmount = totalAmount,
                    Recharges = dtos
                };

                return BaseResponse<object>.SuccessResult(result, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<object>.FailResult($"{ex.Message}");
            }
        }

    }
}
