namespace MeterSystem.Core.DTOs.Customer
{
    public class UpdateCustomerDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
    }
}
