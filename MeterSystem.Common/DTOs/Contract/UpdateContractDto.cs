namespace MeterSystem.Core.DTOs.Contract
{
    public class UpdateContractDto
    {
        public Guid Id { get; set; }
        public string InstallationAddress { get; set; } = default!;
        public decimal FixedFees { get; set; }
        public bool IsActive { get; set; }
    }
}
