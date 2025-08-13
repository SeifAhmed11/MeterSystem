using System.Linq.Expressions;
using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Core.Mapping;
using MeterSystem.Domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;

namespace MeterSystem.Core.Services
{
    public class ContractService : IContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMemoryCacheService _cache;

        public ContractService(IUnitOfWork unitOfWork, IMemoryCacheService cache)
        {
            _unitOfWork = unitOfWork;
            _cache = cache;
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

                var exsitsCustomer = await _unitOfWork.Repository<Customer>().GetOneAsync(filter: m => m.NationalId == dto.CustomerDTO.NationalId);

                var CustomerId = Guid.Empty;

                var lastCode = await _unitOfWork.Repository<Contract>().GetLastCustomerCodeAsync();

                int nextCode = int.TryParse(lastCode, out var numericCode) ? numericCode + 1 : 1;
                contractEntity.CustomerCode = nextCode.ToString("D4");

                if (exsitsCustomer is not null)
                {
                    contractEntity.CustomerId = exsitsCustomer.Id;
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
                return BaseResponse<ContractDto>.FailResult(ex.Message);
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(x => x.Id == id, props:"Customer,Meter");
                if (entity == null)
                    return BaseResponse<bool>.FailResult(StaticMessages.NotFound);

                var contractsOfCustomer = await _unitOfWork.Repository<Contract>().GetAllAsync(filter: c => c.CustomerId == entity.CustomerId);

                int countofCustomerContract = contractsOfCustomer.Count();

                if (countofCustomerContract == 1)
                {
                    await _unitOfWork.Repository<Customer>().SoftDelete(entity.Customer);
                }

                await _unitOfWork.Repository<Contract>().SoftDelete(entity);
                await _unitOfWork.Repository<Meter>().SoftDelete(entity.Meter);

                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, StaticMessages.Deleted);
            }
            catch (Exception ex)
            {
                return BaseResponse<bool>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<List<ContractDto>>> GetAllAsync(Expression<Func<Contract, bool>>? filter = null, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var cacheKey = $"contracts_{filter}_{isTracking}_{ignoreQueryFilters}_{props}";
                var cachedContracts = _cache.Get<List<ContractDto>>(cacheKey);
                
                if (cachedContracts != null)
                {
                    return BaseResponse<List<ContractDto>>.SuccessResult(cachedContracts, StaticMessages.Loaded);
                }

                var entities = await _unitOfWork.Repository<Contract>()
                    .GetAllAsync(filter, isTracking:true, ignoreQueryFilters, props: "Meter,Customer");
                if (entities == null || !entities.Any())
                    return BaseResponse<List<ContractDto>>.FailResult(StaticMessages.NotFound);
                var dtos = entities.Select(x => x.ToDto()).ToList();

                _cache.Set(cacheKey, dtos, TimeSpan.FromSeconds(30));

                return BaseResponse<List<ContractDto>>.SuccessResult(dtos, StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<List<ContractDto>>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> GetByOneAsync(Expression<Func<Contract, bool>> filter, bool isTracking = false, bool ignoreQueryFilters = false, string? props = null)
        {
            try
            {
                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(filter , isTracking: true, props: "Meter,Customer");
                return entity == null
                    ? BaseResponse<ContractDto>.FailResult(StaticMessages.NotFound)
                    : BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), StaticMessages.Loaded);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<ContractDto>> RecoverContract(Guid id)
        {
            var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(filter: c => c.Id == id, ignoreQueryFilters: true, props: "Customer,Meter");
            if (entity == null)
            {
                return BaseResponse<ContractDto>.FailResult(StaticMessages.NotFound);
            }

            await _unitOfWork.Repository<Contract>().Recover(entity);
            await _unitOfWork.Repository<Customer>().Recover(entity.Customer);
            await _unitOfWork.Repository<Meter>().Recover(entity.Meter);
            await _unitOfWork.SaveChangesAsync();
            return BaseResponse<ContractDto>.SuccessResult(entity.ToDto());
        }

        public async Task<BaseResponse<ContractDto>> UpdateAsync(UpdateContractDto dto)
        {
            try
            {
                if (dto == null)
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.Required);

                var entity = await _unitOfWork.Repository<Contract>().GetOneAsync(x => x.Id == dto.Id, props:"Meter");
                if (entity == null)
                    return BaseResponse<ContractDto>.FailResult(StaticMessages.NotFound);

                dto.MapToEntity(entity);
                await _unitOfWork.Repository<Contract>().UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), StaticMessages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"{ex.Message}");
            }
        }

        public async Task<BaseResponse<List<DetailsDto>>> GetCustomerDetailsReportAsync(DateTime from, DateTime to,
            string? customerCode = null, string? meterSerial = null)
        {
            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@from", from),
                    new SqlParameter("@to", to),
                    new SqlParameter("@customer_code", (object?)customerCode ?? DBNull.Value),
                    new SqlParameter("@meter_serial", (object?)meterSerial ?? DBNull.Value)
                };
                var result = await _unitOfWork.Repository<Contract>().GetCustomerDetailsAsync<DetailsDto>("customer_details", parameters);
                return BaseResponse<List<DetailsDto>>.SuccessResult(result, StaticMessages.Loaded);
            }
            catch(Exception ex)
            {
                return BaseResponse<List<DetailsDto>>.FailResult($"{ex.Message}");
            }
        }
    }
}
