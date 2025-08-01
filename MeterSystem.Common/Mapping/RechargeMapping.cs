using MeterSystem.Common.DTOs.Recharge;
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
                MeterId = recharge.MeterId,
                CreatedAt = recharge.CreatedAt,
                UpdatedAt = recharge.UpdatedAt
            };
        }

        public static Recharge ToEntity(this CreateRechargeDto dto)
        {
            return new Recharge
            {
                Amount = dto.Amount,
                MeterId = dto.MeterId,
                CreatedAt = DateTime.UtcNow,
            };
        }

        public static void MapToEntity(this UpdateRechargeDto dto, Recharge recharge)
        {
            recharge.Amount = dto.Amount;
            recharge.MeterId = dto.MeterId;
            recharge.UpdatedAt = DateTime.UtcNow;
        }
    }
}
