using MeterSystem.Core.DTOs.Recharge;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Mapping
{
    public static class RechargeMapping
    {
        public static RechargeDto ToDto(this Recharge recharge)
        {
            return new RechargeDto
            {
                Id = recharge.Id,
                Amount = recharge.Amount,
                RechargeDate = recharge.RechargeDate,
                MeterId = recharge.MeterId,
                CustomerId = recharge.CustomerId,
                CreatedAt = recharge.CreatedAt,
                UpdatedAt = recharge.UpdatedAt
            };
        }

        public static Recharge ToEntity(this CreateRechargeDto dto)
        {
            return new Recharge
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                RechargeDate = dto.RechargeDate,
                MeterId = dto.MeterId,
                CustomerId = dto.CustomerId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static void MapToEntity(this UpdateRechargeDto dto, Recharge recharge)
        {
            recharge.Amount = dto.Amount;
            recharge.RechargeDate = dto.RechargeDate;
            recharge.MeterId = dto.MeterId;
            recharge.CustomerId = dto.CustomerId;
            recharge.UpdatedAt = DateTime.UtcNow;
        }
    }
}
