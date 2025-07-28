namespace MeterSystem.Domain.Entities
{
    public class Contract
    {
        public Guid Id { get; set; }
        public string CustomerCode { get; set; }
        public string InstallationAddress { get; set; }
        public DateTime ActivationDate { get; set; }
        public decimal FixedFees { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set;}
        public Guid MeterId { get; set; }
        public Meter Meter { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        //created by user
        
    }
}
