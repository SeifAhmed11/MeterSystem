using MeterSystem.Common.Interfaces;
using MeterSystem.Core.Mapping;

namespace MeterSystem.Application.Services
{
    public class RechargeService 
    {
        private readonly IUnitOfWork _unitOfWork;

        public RechargeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
