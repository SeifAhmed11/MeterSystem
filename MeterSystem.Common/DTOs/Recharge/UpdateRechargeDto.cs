namespace MeterSystem.Common.DTOs.Recharge
{
    public class UpdateRechargeDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public Guid MeterId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
