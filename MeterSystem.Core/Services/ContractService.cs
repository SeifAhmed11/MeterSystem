using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;

namespace MeterSystem.Core.Services
{
    public class ContractService : BaseResponse<ContractDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        public ContractService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }
       
    }
}
