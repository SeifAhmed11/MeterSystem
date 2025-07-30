<<<<<<< HEAD
﻿using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;
=======
﻿
using System.Linq.Expressions;
using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.DTOs.Recharge;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
>>>>>>> c25383f51c4826f41ad0012681e41dc5e7fdc3ca

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IContractService
    {
        Task<BaseResponse<List<ContractDto>>> GetAllAsync(Expression<Func<Contract, bool>>? filter = null, bool isTracking = false, string? props = null);
<<<<<<< HEAD
        Task<BaseResponse<ContractDto>> GetOneAsync(Expression<Func<Contract, bool>> filter, bool isTracking = false, string? props = null);
=======
        Task<BaseResponse<ContractDto>> GetByOneAsync(Expression<Func<Contract, bool>> filter, bool isTracking = false, string? props = null);
>>>>>>> c25383f51c4826f41ad0012681e41dc5e7fdc3ca
        Task<BaseResponse<ContractDto>> CreateAsync(CreateContractDto dto);
        Task<BaseResponse<ContractDto>> UpdateAsync(UpdateContractDto dto);
        Task<BaseResponse<bool>> DeleteAsync(Guid id);
    }
}
