using MeterSystem.Domain.Base;

namespace MeterSystem.Domain.Entities
{
    public class Recharge : BaseEntity
    {
        public decimal Amount { get; set; }
        public Guid MeterId { get; set; }
        public Meter Meter { get; set; } = default!;
    }
}
