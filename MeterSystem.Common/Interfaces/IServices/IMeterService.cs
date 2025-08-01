using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MeterSystem.Common.DTOs.Consumption;
using MeterSystem.Common.DTOs.Meter;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IMeterService
    {
        Task<BaseResponse<List<MeterDto>>> GetAllAsync(Expression<Func<Meter, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<BaseResponse<MeterDto>> GetOneAsync(Expression<Func<Meter, bool>> filter, bool isTracking = false, string? props = null);
    }
}