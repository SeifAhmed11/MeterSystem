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
                    return BaseResponse<ContractDto>.FailResult(Messages.Required);

                var entity = dto.ToEntity();
                await _unitOfWork.Contracts.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), Messages.Created);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _unitOfWork.Contracts.GetOneAsync(x => x.Id == id);
                if (entity == null)
                    return BaseResponse<bool>.FailResult(Messages.NotFound);

                await _unitOfWork.Contracts.DeleteAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<bool>.SuccessResult(true, Messages.Deleted);
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
                var entities = await _unitOfWork.Contracts.GetAllAsync(filter, isTracking, props);
                var dtos = entities.Select(x => x.ToDto()).ToList();
                return BaseResponse<List<ContractDto>>.SuccessResult(dtos, Messages.Loaded);
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
                var entity = await _unitOfWork.Contracts.GetOneAsync(filter, isTracking, props);
                return entity == null
                    ? BaseResponse<ContractDto>.FailResult(Messages.NotFound)
                    : BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), Messages.Loaded);
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
                    return BaseResponse<ContractDto>.FailResult(Messages.Required);

                var entity = await _unitOfWork.Contracts.GetOneAsync(x => x.Id == dto.Id);
                if (entity == null)
                    return BaseResponse<ContractDto>.FailResult(Messages.NotFound);

                dto.MapToEntity(entity);
                await _unitOfWork.Contracts.UpdateAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                return BaseResponse<ContractDto>.SuccessResult(entity.ToDto(), Messages.Updated);
            }
            catch (Exception ex)
            {
                return BaseResponse<ContractDto>.FailResult($"Unexpected error: {ex.Message}");
            }
        }
    }
}
