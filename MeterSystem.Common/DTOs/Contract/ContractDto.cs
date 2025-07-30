namespace MeterSystem.Common.DTOs.Contract
{
    public class ContractDto
    {
        public Guid Id { get; set; }
        public string CustomerCode { get; set; } = default!;
        public string InstallationAddress { get; set; } = default!;
        public DateTime ActivationDate { get; set; }
        public decimal FixedFees { get; set; }
        public bool IsActive { get; set; }
        public Guid MeterId { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
