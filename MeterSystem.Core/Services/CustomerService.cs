using MeterSystem.Core.DTOs.Customer;
using MeterSystem.Core.Mapping;
using MeterSystem.Core.Responses;
using MeterSystem.Core.Services.Base;
using MeterSystem.Core.Services.Interfaces;
using MeterSystem.Domain.Interfaces;

namespace MeterSystem.Core.Services
{
    public class CustomerService : BaseService, ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CustomerService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseResponse<Guid>> CreateAsync(CreateCustomerDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return Fail<Guid>("Customer data cannot be null");
                }
                
                if (string.IsNullOrEmpty(dto.Name))
                {
                    return Fail<Guid>("Name is required");
                }

                if (string.IsNullOrEmpty(dto.NationalId))
                {
                    return Fail<Guid>("National ID is required");
                }

                if (string.IsNullOrEmpty(dto.Address))
                {
                    return Fail<Guid>("Address ID is required");
                }

                var existingCustomer = await _unitOfWork.Customers.GetOneAsync(filter: c =>
                c.NationalId == dto.NationalId);

                if (existingCustomer != null)
                {
                    return Fail<Guid>($"Customer with National ID {dto.NationalId} already exists");
                }

                var customer = dto.ToEntity();

                await _unitOfWork.Customers.AddAsync(customer);
                await _unitOfWork.SaveChangesAsync();

                return Success(customer.Id, "Customer created successfully");
            }
            catch (Exception ex)
            {
                return Fail<Guid>($"Error creating customer: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> DeleteAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return Fail<CustomerDto>("Invalid customer ID");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(
                    filter: c => c.Id == id,
                    isTracking: true
                );

                if (customer == null)
                {
                    return Fail<CustomerDto>($"Customer not found with ID: {id} or customer already deleted");
                }

                var customerDto = customer.ToDto();

                await _unitOfWork.Customers.DeleteAsync( customer );

                await _unitOfWork.SaveChangesAsync();

                return Success(customerDto, "Customer deleted successfully");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error deleting customer: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<CustomerDto>>> GetAllAsync()
        {
            try
            {
                var customers = await _unitOfWork.Customers.GetAllAsync();

                if (customers == null || !customers.Any())
                {
                    return Success(new List<CustomerDto>(), "No customers found");
                }

                var customerDtos = customers.Select(customer => customer.ToDto()).ToList();

                return Success(customerDtos, "Customers retrieved successfully");
            }
            catch (Exception ex)
            {
                return Fail<List<CustomerDto>>($"Error retrieving customers: {ex.Message}");
            }

        }

        public async Task<BaseResponse<List<CustomerDto>>> GetAllFilterByNameAsync(string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return Fail<List<CustomerDto>>("Name parameter cannot be null or empty");
                }

                var customers = await _unitOfWork.Customers.GetAllAsync(filter: c => c.Name.Contains(name));

                if (customers == null || !customers.Any())
                {
                    return Success(new List<CustomerDto>(), $"No customers found with name containing '{name}'");
                }

                var customerDtos = customers.Select(customer => customer.ToDto()).ToList();

                var count = customerDtos.Count;

                return Success(customerDtos, $"Found {count} customer(s) with name containing '{name}'");
            }
            catch (Exception ex)
            {
                return Fail<List<CustomerDto>>($"Error retrieving customers by name: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetByCustomerCodeAsync(string code)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code))
                {
                    return Fail<CustomerDto>("Invalid customer code");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(
                    filter: c => c.Contracts.Any(contract => contract.CustomerCode == code),
                    props: "Contracts",
                    isTracking: false
                );

                if (customer == null)
                {
                    return Fail<CustomerDto>($"Customer not found with code: {code}");
                }

                var customerDto = customer.ToDto();

                return Success(customerDto, "Customer retrieved successfully");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error retrieving customer by code: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetByIdAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return Fail<CustomerDto>("Invalid customer ID");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(filter: c => c.Id == id);

                if (customer == null)
                {
                    return Fail<CustomerDto>($"Customer not found with ID: {id}");
                }

                var customerDto = customer.ToDto();

                return Success(customerDto, "Customer retrieved successfully");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error retrieving customer: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetByMeterSerialAsync(string serial)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(serial))
                {
                    return Fail<CustomerDto>("Invalid meter serial number");
                }

                var meter = await _unitOfWork.Meters.GetOneAsync(filter: m => m.Serial == serial, 
                    props: "Contract.Customer");

                if (meter == null)
                {
                    return Fail<CustomerDto>($"Meter not found with serial: {serial}");
                }

                if (meter.Contract == null)
                {
                    return Fail<CustomerDto>("No contract associated with this meter");
                }

                if (meter.Contract.Customer == null)
                {
                    return Fail<CustomerDto>("No customer associated with this meter");
                }

                var customerDto = meter.Contract.Customer.ToDto();

                return Success(customerDto, "Customer retrieved successfully by meter serial");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error retrieving customer by meter serial: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetByNationalIdAsync(string natId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(natId))
                {
                    return Fail<CustomerDto>("National ID cannot be null or empty");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(filter: c => c.NationalId == natId);

                if (customer == null)
                {
                    return Fail<CustomerDto>($"Customer not found with National ID: {natId}");
                }

                var customerDto = customer.ToDto();

                return Success(customerDto, "Customer retrieved successfully by National ID");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error retrieving customer by National ID: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> GetByRechargeIdAsync(Guid rechargeId)
        {
            try
            {
                if (rechargeId == Guid.Empty)
                {
                    return Fail<CustomerDto>("Invalid recharge ID");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(
                    filter: c => c.Recharges.Any(r => r.Id == rechargeId),
                    props: "Recharges",
                    isTracking: false
                );

                if (customer == null)
                {
                    return Fail<CustomerDto>($"Customer not found for recharge with ID: {rechargeId}");
                }

                var customerDto = customer.ToDto();

                return Success(customerDto, "Customer retrieved successfully by recharge ID");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error retrieving customer by recharge ID: {ex.Message}");
            }
        }

        public async Task<BaseResponse<CustomerDto>> UpdateAsync(UpdateCustomerDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return Fail<CustomerDto>("Customer data cannot be null");
                }

                if (dto.Id == Guid.Empty)
                {
                    return Fail<CustomerDto>("Invalid customer ID");
                }

                if (string.IsNullOrEmpty(dto.Name))
                {
                    return Fail<CustomerDto>("Name is required");
                }

                if (string.IsNullOrEmpty(dto.Address))
                {
                    return Fail<CustomerDto>("Address is required");
                }

                var existingCustomer = await _unitOfWork.Customers.GetOneAsync(filter: c => c.Id == dto.Id,
                    isTracking: true);

                if (existingCustomer == null)
                {
                    return Fail<CustomerDto>($"Customer not found with ID: {dto.Id}");
                }

                dto.MapToEntity(existingCustomer);

                await _unitOfWork.Customers.UpdateAsync(existingCustomer);
                await _unitOfWork.SaveChangesAsync();

                var customerDto = existingCustomer.ToDto();

                return Success(customerDto, "Customer updated successfully");
            }
            catch (Exception ex)
            {
                return Fail<CustomerDto>($"Error updating customer: {ex.Message}");
            }
        }
    }
}
