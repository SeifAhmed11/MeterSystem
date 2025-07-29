using MeterSystem.Core.DTOs.Contract;
using MeterSystem.Core.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Core.Services.Interfaces
{
    public interface IContractService
    {
        Task<BaseResponse<List<ContractDto>>> GetAllAsync();
        Task<BaseResponse<List<ContractDto>>> GetAllByDateAsync(DateOnly date);
        Task<BaseResponse<ContractDto>> GetByIdAsync(Guid id);
        Task<BaseResponse<ContractDto>> GetByMeterSerialAsync(string serial);
        Task<BaseResponse<ContractDto>> GetByCustomerCodeAsync(string code);
        Task<BaseResponse<CreateContractDto>> CreateContractAsync(CreateContractDto createContractDto);
        Task<BaseResponse<UpdateContractDto>> UpdateContractAsync(UpdateContractDto updateContractDto);
        Task<BaseResponse<ContractDto>> DeleteContractAsync(Guid id);
    }
}
