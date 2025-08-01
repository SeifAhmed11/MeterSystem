using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.DTOs.Meter;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Mapping
{
    public static class ContractMapping
    {
        public static ContractDto ToDto(this Contract contract)
        {
            return new ContractDto
            {
                Id = contract.Id,
                CustomerCode = contract.CustomerCode,
                InstallationAddress = contract.InstallationAddress,
                ActivationDate = contract.ActivationDate,
                FixedFees = contract.FixedFees,
                MeterId = contract.MeterId,
                CustomerId = contract.CustomerId,
                CreatedAt = contract.CreatedAt,
                Meter = contract.Meter?.ToDto(),
                Customer = contract.Customer?.ToDto()
            };
        }

        public static Contract ToEntity(this CreateContractDto dto)
        {
            return new Contract
            {
                InstallationAddress = dto.InstallationAddress,
                ActivationDate = dto.ActivationDate,
                FixedFees = dto.FixedFees,
                CreatedAt = DateTime.UtcNow,
            };
        }

        public static void MapToEntity(this UpdateContractDto dto, Contract contract)
        {
            contract.InstallationAddress = dto.InstallationAddress;
            contract.FixedFees = dto.FixedFees;
            contract.Meter.Type = dto.MeterDTO.Type;
            contract.UpdatedAt = DateTime.UtcNow;
        }
    }
}
