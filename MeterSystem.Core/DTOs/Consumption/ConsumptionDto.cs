namespace MeterSystem.Core.DTOs.Consumption
{
    public class ConsumptionDto
    {
        public Guid Id { get; set; }
        public DateTime ReadingDate { get; set; }
        public decimal PreviousReading { get; set; }
        public decimal CurrentReading { get; set; }
        public decimal ConsumptionUnits { get; set; }
        public Guid MeterId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
