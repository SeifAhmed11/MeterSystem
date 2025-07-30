namespace MeterSystem.Core.DTOs.Meter
{
    public class MeterDto
    {
        public Guid Id { get; set; }
        public string Serial { get; set; } = default!;
        public string Type { get; set; } = default!;
        public DateTime InstalledDate { get; set; }
        public int TotalRecharges { get; set; }
        public int TotalConsumptions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
