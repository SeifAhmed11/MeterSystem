namespace MeterSystem.Common.DTOs.Customer
{
    public class CustomerDto
    {
        public Guid Id { get; set; }
        public string NationalId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
        public int NumberOfContracts { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
