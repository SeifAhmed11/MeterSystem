namespace MeterSystem.Core.DTOs.Meter
{
    public class CreateMeterDto
    {
        public string Serial { get; set; } = default!;
        public string Type { get; set; } = default!;
        public DateTime InstalledDate { get; set; }
    }
}
