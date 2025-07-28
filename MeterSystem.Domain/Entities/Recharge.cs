using MeterSystem.Domain.Base;

namespace MeterSystem.Domain.Entities
{
    public class Recharge : BaseEntity
    {
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public Guid MeterId { get; set; }
        public Meter Meter { get; set; } = default!;
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; } = default!;
    }
}
