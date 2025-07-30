using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Services
{
    public class ContractService : IContractService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContractService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<ContractDto>> CreateAsync(CreateContractDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.Required);

                var contractEntity = dto.ToEntity();

                var MeterEntity = dto.MeterDTO.ToEntity();

                var exsitsMeter = await _unitOfWork.Repository<Meter>().GetOneAsync(filter: m => m.Serial == MeterEntity.Serial);

                if (exsitsMeter is not null)
                {
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.AlreadyExists);
                }

                var meter = await _unitOfWork.Repository<Meter>().AddAsync(MeterEntity);

                var CustomerEntity = dto.CustomerDTO.ToEntity();

                var exsitsCustomer = await _unitOfWork.Repository<Customer>().GetOneAsync(filter: m => m.NationalId == CustomerEntity.NationalId);

                var CustomerId = Guid.Empty;

                if (exsitsCustomer is not null)
                {
                    CustomerId = exsitsCustomer.Id;
                    contractEntity.CustomerId = CustomerId;
                }
                else
                {
                    var Customer = await _unitOfWork.Repository<Customer>().AddAsync(CustomerEntity);
                    contractEntity.Customer = Customer;
                }

                
                contractEntity.Meter = meter;

                await _unitOfWork.Repository<Contract>().AddAsync(contractEntity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ContractDto>.SuccessResult(contractEntity.ToDto(), StaticMessages.Created);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult({ex.Message});
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(x => x.Id == id);
                if (entity == null)
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);

                await _unitOfWork.Repository<Contract>().DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex)
            {
                return BaseResponse<bool>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<List<ContractDto>>> GetAllAsync(Expression<Func<Contract, bool>>? filter = null, bool isTracking = false, string? props = null)
        {
            try
            {
                var entities = await _unitOfWork.Repository<Contract>().GetAllAsync(filter, isTracking, props);
                var dtos = entities.Select(x => x.ToDto()).ToList();
                return BaseResponse<List<ContractDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<ContractDto>>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> GetByOneAsync(Expression<Func<Contract, bool>> filter, bool isTracking = false, string? props = null)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(filter, isTracking, props);
                return entity == null
                    ? BaseResponse<ContractDto>.FailResult(StaticMessages.NotFound)
                    : BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> UpdateAsync(UpdateContractDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.Required);

                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(x => x.Id == dto.Id);
                if (entity == null)
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.NotFound);

                dto.MapToEntity(entity);
                await _unitOfWork.Repository<Contract>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), StaticMessages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }
    }
}
