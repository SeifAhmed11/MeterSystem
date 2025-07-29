namespace MeterSystem.Core.DTOs.Meter
{
    public class UpdateMeterDto
    {
        public string Type { get; set; } = default!;
        public DateTime InstalledDate { get; set; }
    }
}
