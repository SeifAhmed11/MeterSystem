namespace MeterSystem.Common.DTOs.Meter
{
    public class UpdateMeterDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = default!;
        public DateTime InstalledDate { get; set; }
    }
}
