using MeterSystem.Core.DTOs.Meter;
using MeterSystem.Core.Responses;

namespace MeterSystem.Core.Services.Interfaces
{
    public interface IMeterService
    {
        Task<BaseResponse<MeterDto>> GetByIdAsync(Guid id);
        Task<BaseResponse<MeterDto>> GetBySerialAsync(string serial);
        Task<BaseResponse<MeterDto>> GetByContractIdAsync(Guid contractId);
        Task<BaseResponse<List<MeterDto>>> GetAllAsync();
        Task<BaseResponse<bool>> CreateAsync(CreateMeterDto dto);
        Task<BaseResponse<bool>> UpdateAsync(UpdateMeterDto dto);
    }
}
