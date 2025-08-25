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

        public async Task<BaseResponse<List<MeterDto>>> GetAllAsync(Expression<Func<Meter, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var meters = await _unitOfWork.Repository<Meter>().GetAllAsync(filter, isTracking, ignoreQueryFilters, props:"Recharges");
                if (meters == null || !meters.Any())
                    return BaseResponse<List<MeterDto>>.FailResult(StaticMessages.NotFound);

                var dtos = meters.Select(c => c.ToDto()).ToList();

                return BaseResponse<List<MeterDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<MeterDto>>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<MeterDto>> GetOneAsync(Expression<Func<Meter, bool>> filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var customer = await _unitOfWork.Repository<Meter>().GetOneAsync(filter, isTracking, ignoreQueryFilters, props);
                if (customer == null)
                {
                    return BaseResponse<MeterDto>.FailResult(StaticMessages.NotFound);
                }

                var dto = customer.ToDto();

                return BaseResponse<MeterDto>.SuccessResult(dto, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<MeterDto>.FailResult($"{ex.Message}");
            }
        }
    }
}
