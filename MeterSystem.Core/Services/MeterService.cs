using MeterSystem.Common.Interfaces;
using MeterSystem.Core.Mapping;

namespace MeterSystem.Core.Services
{
    public class MeterService 
    {
        private readonly IUnitOfWork _unitOfWork;

        public MeterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
