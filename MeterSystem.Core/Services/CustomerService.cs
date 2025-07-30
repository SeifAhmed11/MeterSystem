using MeterSystem.Common.Interfaces;
using MeterSystem.Core.Mapping;

namespace MeterSystem.Core.Services
{
    public class CustomerService 
    {
        private readonly IUnitOfWork _unitOfWork;
        public CustomerService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }
    }
}
