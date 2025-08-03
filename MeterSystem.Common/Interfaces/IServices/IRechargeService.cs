using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MeterSystem.Common.DTOs.Meter;
using MeterSystem.Common.DTOs.Recharge;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IRechargeService
    {
        Task<BaseResponse<List<RechargeDto>>> GetAllAsync(Expression<Func<Recharge, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<BaseResponse<RechargeDto>> GetByOneAsync(Expression<Func<Recharge, bool>> filter, bool isTracking = false, string? props = null);
        Task<BaseResponse<RechargeDto>> CreateAsync(CreateRechargeDto dto);
        Task<BaseResponse<RechargeDto>> UpdateAsync(UpdateRechargeDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
        Task<BaseResponse<RechargeDto>> GetLastCharge(string serial);
        Task<BaseResponse<Object>> GetByDateRangeAsync(string? serial, DateTime fromDate, DateTime toDate);
    }
}
