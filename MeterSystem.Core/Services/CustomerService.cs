using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;
using MeterSystem.Domain.Entities;
using System.Linq.Expressions;

namespace MeterSystem.Core.Services
{
    public class CustomerService : BaseResponse<CustomerDto>, ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<List<CustomerDto>>> GetAllAsync(Expression<Func<Customer, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var customers = await _unitOfWork.Repository<Customer>().GetAllAsync(filter, isTracking, ignoreQueryFilters, props);
                if (customers == null || !customers.Any())
                    return BaseResponse<List<CustomerDto>>.FailResult(StaticMessages.NotFound);

                var dtos = customers.Select(c => c.ToDto()).ToList();
                return BaseResponse<List<CustomerDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<CustomerDto>>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetOneAsync(Expression<Func<Customer, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                var customer = await _unitOfWork.Repository<Customer>().GetOneAsync(filter, isTracking, props);
                if(customer == null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.NotFound);
                }

                var dto = customer.ToDto();

                return BaseResponse<CustomerDto>.SuccessResult(dto, StaticMessages.Loaded);
            }
            catch(Exception ex)
            {
                return BaseResponse<CustomerDto>.FailResult($"{ex.Message}");
            }
        }
    }
}
