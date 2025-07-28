namespace MeterSystem.Domain.Entities
{
    public class Recharge
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public DateTime CreatedAt { get; set; }
        //relation with User 
        //relation with meter
        //relation with customer
    }
}
