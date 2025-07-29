using MeterSystem.Core.DTOs.Contract;
using MeterSystem.Core.Mapping;
using MeterSystem.Core.Responses;
using MeterSystem.Core.Services.Base;
using MeterSystem.Core.Services.Interfaces;
using MeterSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Core.Services
{
    public class ContractService : BaseService, IContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ContractService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseResponse<CreateContractDto>> CreateContractAsync(CreateContractDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return Fail<CreateContractDto>("Contract data cannot be null");
                }

                if (string.IsNullOrWhiteSpace(dto.CustomerCode))
                {
                    return Fail<CreateContractDto>("Customer code is required");
                }

                if (string.IsNullOrEmpty(dto.InstallationAddress))
                {
                    return Fail<CreateContractDto>("Installation address is required");
                }

                if (dto.MeterId == Guid.Empty)
                {
                    return Fail<CreateContractDto>("Meter ID is required");
                }

                if (dto.CustomerId == Guid.Empty)
                {
                    return Fail<CreateContractDto>("Customer ID is required");
                }

                var meter = await _unitOfWork.Meters.GetOneAsync(filter: m =>
                m.Id == dto.MeterId);

                if (meter == null)
                {
                    return Fail<CreateContractDto>($"Meter with ID {dto.MeterId} not found");
                }

                var customer = await _unitOfWork.Customers.GetOneAsync(filter: c =>
                c.Id == dto.CustomerId );

                if (customer == null)
                {
                    return Fail<CreateContractDto>($"Customer with ID {dto.CustomerId} not found");
                }

                var existingContract = await _unitOfWork.Contracts.GetOneAsync(filter: c =>
                c.MeterId == dto.MeterId && c.IsActive);

                if (existingContract != null)
                {
                    return Fail<CreateContractDto>($"Active contract already exists for meter " +
                        $"{dto.MeterId}");
                }

                var contract = dto.ToEntity();

                await _unitOfWork.Contracts.AddAsync(contract);

                await _unitOfWork.SaveChangesAsync();

                return Success(dto, "Contract created successfully");
            }
            catch (Exception ex)
            {
                return Fail<CreateContractDto>($"Error creating contract: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> DeleteContractAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return Fail<ContractDto>("Invalid contract ID");
                }

                var contract = await _unitOfWork.Contracts.GetOneAsync(filter: c => c.Id == id, 
                    isTracking: true);

                if (contract == null)
                {
                    return Fail<ContractDto>($"Contract not found with ID: {id} or contract already deleted");
                }

                var contractDto = contract.ToDto();

                await _unitOfWork.Contracts.DeleteAsync(contract);
                await _unitOfWork.SaveChangesAsync();

                return Success(contractDto, "Contract deleted successfully");
            }
            catch (Exception ex)
            {
                return Fail<ContractDto>($"Error deleting contract: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<ContractDto>>> GetAllAsync()
        {
            try
            {
                var contracts = await _unitOfWork.Contracts.GetAllAsync();

                if (contracts == null || !contracts.Any())
                {
                    return Success(new List<ContractDto>(), "No contracts found");
                }

                var contractDtos = contracts.Select(contract => contract.ToDto()).ToList();

                return Success(contractDtos, "Contracts retrieved successfully");
            }
            catch (Exception ex)
            {
                return Fail<List<ContractDto>>($"Error retrieving contracts: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<ContractDto>>> GetAllByDateAsync(DateOnly date)
        {
            try
            {
                var contracts = await _unitOfWork.Contracts.GetAllAsync(
                    filter: c => DateOnly.FromDateTime(c.CreatedAt) == date,
                    props: "Customer,Meter");

                if (contracts == null || !contracts.Any())
                {
                    return Success(new List<ContractDto>(), $"No contracts found for date: {date}");
                }

                var contractDtos = contracts.Select(contract => contract.ToDto()).ToList();

                return Success(contractDtos, $"Found {contractDtos.Count} contract(s) for date: {date}");
            }
            catch (Exception ex)
            {
                return Fail<List<ContractDto>>($"Error retrieving contracts by date: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> GetByCustomerCodeAsync(string code)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code))
                {
                    return Fail<ContractDto>("Invalid customer code");
                }

                var contract = await _unitOfWork.Contracts.GetOneAsync( filter: c => c.CustomerCode == code);

                if (contract == null)
                {
                    return Fail<ContractDto>($"Contract not found with customer code: {code}");
                }

                var contractDto = contract.ToDto();

                return Success(contractDto, "Contract retrieved successfully by customer code");
            }
            catch (Exception ex)
            {
                return Fail<ContractDto>($"Error retrieving contract by customer code: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> GetByIdAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return Fail<ContractDto>("Invalid contract ID");
                }

                var contract = await _unitOfWork.Contracts.GetOneAsync(filter: c => c.Id == id,
                    props: "Customer,Meter,Recharges");

                if (contract == null)
                {
                    return Fail<ContractDto>($"Contract not found with ID: {id}");
                }

                var contractDto = contract.ToDto();

                return Success(contractDto, "Contract retrieved successfully");
            }
            catch (Exception ex)
            {
                return Fail<ContractDto>($"Error retrieving contract: {ex.Message}");
            };
        }

        public async Task<BaseResponse<ContractDto>> GetByMeterSerialAsync(string serial)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(serial))
                {
                    return Fail<ContractDto>("Invalid meter serial number");
                }

                var contract = await _unitOfWork.Contracts.GetOneAsync(filter: c => c.Meter.Serial == serial,
                    props: "Customer,Meter");

                if (contract == null)
                {
                    return Fail<ContractDto>($"Contract not found for meter with serial: {serial}");
                }

                var contractDto = contract.ToDto();

                return Success(contractDto, "Contract retrieved successfully by meter serial");
            }
            catch (Exception ex)
            {
                return Fail<ContractDto>($"Error retrieving contract by meter serial: {ex.Message}");
            }
        }

        public async Task<BaseResponse<UpdateContractDto>> UpdateContractAsync(UpdateContractDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return Fail<UpdateContractDto>("Contract data cannot be null");
                }

                if (dto.Id == Guid.Empty)
                {
                    return Fail<UpdateContractDto>("Invalid contract ID");
                }
           
                var existingContract = await _unitOfWork.Contracts.GetOneAsync(filter: c =>
                c.Id == dto.Id, isTracking: true);

                if (existingContract == null)
                {
                    return Fail<UpdateContractDto>($"Contract not found with ID: {dto.Id}");
                }

                if (string.IsNullOrEmpty(dto.InstallationAddress))
                {
                    return Fail<UpdateContractDto>("Installation address is required");
                }

                if (dto.FixedFees < 0)
                {
                    return Fail<UpdateContractDto>($"fees should gretar that 0");
                }

                dto.MapToEntity(existingContract);
            
                await _unitOfWork.Contracts.UpdateAsync(existingContract);

                await _unitOfWork.SaveChangesAsync();

                return Success(dto, "Contract updated successfully");
            }
            catch (Exception ex)
            {
                return Fail<UpdateContractDto>($"Error updating contract: {ex.Message}");
            }
        }
    }
}
