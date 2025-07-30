namespace MeterSystem.Core.DTOs.Customer
{
    public class CreateCustomerDto
    {
        public string NationalId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
    }
}
