using MeterSystem.Core.DTOs.Meter;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Mapping
{
    public static class MeterMapping
    {
        public static MeterDto ToDto(this Meter meter)
        {
            return new MeterDto
            {
                Id = meter.Id,
                Serial = meter.Serial,
                Type = meter.Type,
                InstalledDate = meter.InstalledDate,
                TotalRecharges = meter.Recharges?.Count ?? 0,
                TotalConsumptions = meter.Consumptions?.Count ?? 0,
                CreatedAt = meter.CreatedAt,
                UpdatedAt = meter.UpdatedAt
            };
        }

        public static Meter ToEntity(this CreateMeterDto dto)
        {
            return new Meter
            {
                Id = Guid.NewGuid(),
                Serial = dto.Serial,
                Type = dto.Type,
                InstalledDate = dto.InstalledDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static void MapToEntity(this UpdateMeterDto dto, Meter meter)
        {
            meter.Type = dto.Type;
            meter.InstalledDate = dto.InstalledDate;
            meter.UpdatedAt = DateTime.UtcNow;
        }
    }
}
