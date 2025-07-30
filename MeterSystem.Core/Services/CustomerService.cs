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

        public async Task<BaseResponse<CustomerDto>> CreateAsync(CreateCustomerDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                if (string.IsNullOrWhiteSpace(dto.NationalId))
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }
                if (string.IsNullOrWhiteSpace(dto.Name))
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }
                if (string.IsNullOrWhiteSpace(dto.Address))
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required); 
                }

                 var existingCustomer = await _unitOfWork.Customers.GetOneAsync(c => c.NationalId == dto.NationalId);
                if (existingCustomer != null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.AlreadyExists);
                }

                var customer = dto.ToEntity();

                await _unitOfWork.Customers.AddAsync(customer);

                await _unitOfWork.SaveChangesAsync();

                var createdCustomerDto = customer.ToDto(); 

                return BaseResponse<CustomerDto>.SuccessResult(createdCustomerDto, StaticMessages.Created);

            }
            catch (Exception ex)
            {
                
                return BaseResponse<CustomerDto>.FailResult($"{StaticMessages.Invalid}: {ex.Message}");
            }

        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BaseResponse<bool>.FailResult(StaticMessages.Invalid);
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(c => c.Id == id);

                if (customer == null)
                {
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);
                }

                await _unitOfWork.Customers.DeleteAsync(customer);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex) 
            {
                return BaseResponse<bool>.FailResult($"{StaticMessages.Invalid}: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<CustomerDto>>> GetAllAsync(Expression<Func<Customer, bool>>? filter = null,
            bool isTracking = false, string? props = null)
        {
            try
            {
                var customers = await _unitOfWork.Customers.GetAllAsync(filter: filter, isTracking: isTracking, props: props);

                if (customers == null || !customers.Any())
                {
                    
                    return BaseResponse<List<CustomerDto>>.SuccessResult(new List<CustomerDto>(),
                        StaticMessages.Loaded);
                }

                var customersDto = customers.Select(c => c.ToDto()).ToList();

                return BaseResponse<List<CustomerDto>>.SuccessResult(customersDto,
                        StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<CustomerDto>>.FailResult($"{StaticMessages.Invalid}: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetOneAsync(Expression<Func<Customer, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                if (filter == null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(
                    filter: filter,
                    isTracking: isTracking,
                    props: props
                );

                if (customer == null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.NotFound);
                }

                var customerDto = customer.ToDto();

                return BaseResponse<CustomerDto>.SuccessResult(customerDto, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<CustomerDto>.FailResult($"{StaticMessages.Invalid}: {ex.Message}");
            }

        }

        public async Task<BaseResponse<CustomerDto>> UpdateAsync(UpdateCustomerDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                if (dto.Id == Guid.Empty)
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                var existingCustomer = await _unitOfWork.Customers.GetOneAsync(
                    filter: c => c.Id == dto.Id,
                    isTracking: true
                );

                if (existingCustomer == null)
                {
                    return BaseResponse<CustomerDto>.FailResult($"{StaticMessages.NotFound}: {dto.Id}");
                }

                if (string.IsNullOrWhiteSpace(dto.Name))
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                if (string.IsNullOrWhiteSpace(dto.Address))
                {
                    return BaseResponse<CustomerDto>.FailResult(StaticMessages.Required);
                }

                dto.MapToEntity(existingCustomer);

                await _unitOfWork.Customers.UpdateAsync(existingCustomer);

                await _unitOfWork.SaveChangesAsync();

                var updatedCustomerDto = existingCustomer.ToDto();

                return BaseResponse<CustomerDto>.SuccessResult(updatedCustomerDto, StaticMessages.Updated);

            }
            catch (Exception ex)
            {
                return BaseResponse<CustomerDto>.FailResult($"{StaticMessages.Invalid} : {ex.Message}");
            }

        }
    }
}
