using MeterSystem.Core.DTOs.Consumption;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Mapping
{
    public static class ConsumptionMapping
    {
        public static ConsumptionDto ToDto(this Consumption consumption)
        {
           return new ConsumptionDto
            {
                Id = consumption.Id,
                ReadingDate = consumption.ReadingDate,
                PreviousReading = consumption.PreviousReading,
                CurrentReading = consumption.CurrentReading,
                ConsumptionUnits = consumption.ConsumptionUnits,
                MeterId = consumption.MeterId,
                CreatedAt = consumption.CreatedAt
            };
        }

        public static Consumption ToEntity(this CreateConsumptionDto dto)
        {
            return new Consumption
            {
                Id = Guid.NewGuid(),
                ReadingDate = dto.ReadingDate,
                PreviousReading = dto.PreviousReading,
                CurrentReading = dto.CurrentReading,
                ConsumptionUnits = dto.ConsumptionUnits,
                MeterId = dto.MeterId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static void MapToEntity(this Consumption consumption, UpdateConsumptionDto dto)
        {
            consumption.ReadingDate = dto.ReadingDate;
            consumption.PreviousReading = dto.PreviousReading;
            consumption.CurrentReading = dto.CurrentReading;
            consumption.ConsumptionUnits = dto.ConsumptionUnits;
            consumption.MeterId = dto.MeterId;
            consumption.UpdatedAt = DateTime.UtcNow;
        }
    }
}
