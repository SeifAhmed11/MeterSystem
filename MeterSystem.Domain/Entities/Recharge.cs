namespace MeterSystem.Domain.Entities
{
    public class Recharge
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid MeterId { get; set; }
        public Meter Meter { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
