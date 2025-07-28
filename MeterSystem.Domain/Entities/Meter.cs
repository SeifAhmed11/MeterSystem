namespace MeterSystem.Domain.Entities
{
    public class Meter
    {
        public Guid Id { get; set; }
        public string Serial { get; set; }
        public string Type { get; set; }
        public DateTime InstalledDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<Recharge> Recharges { get; set; }
        public ICollection<Consumption> Consumptions { get; set; }
        public Contract Contract { get; set; }
    }
}
