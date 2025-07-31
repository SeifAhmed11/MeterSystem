using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;


namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IContractService
    {
        Task<BaseResponse<List<ContractDto>>> GetAllAsync(Expression<Func<Contract, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<BaseResponse<ContractDto>> GetByOneAsync(Expression<Func<Contract, bool>> filter , bool isTracking = false, bool ignoreQueryFilters = false, string? props = null);
        Task<BaseResponse<ContractDto>> CreateAsync(CreateContractDto dto);
        Task<BaseResponse<ContractDto>> UpdateAsync(UpdateContractDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
    }
}
