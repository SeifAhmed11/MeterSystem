using MeterSystem.Domain.Base;

namespace MeterSystem.Domain.Entities
{
    public class Meter : BaseEntity
    {
        public string Serial { get; set; } = default!;
        public string Type { get; set; } = default!;
        public DateTime InstalledDate { get; set; }
        public ICollection<Recharge> Recharges { get; set; } = new List<Recharge>();
        public ICollection<Consumption> Consumptions { get; set; } = new List<Consumption>();
        public Contract Contract { get; set; } = default!;
    }
}
