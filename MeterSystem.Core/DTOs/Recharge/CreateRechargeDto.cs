namespace MeterSystem.Core.DTOs.Recharge
{
    public class CreateRechargeDto
    {
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public Guid MeterId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
