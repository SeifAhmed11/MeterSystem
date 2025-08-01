using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.DTOs.Meter;

namespace MeterSystem.Common.DTOs.Recharge
{
    public class CreateRechargeDto
    {
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }
        public Guid MeterId { get; set; }
        public Guid CustomerId { get; set; }
        public CreateMeterDto MeterDTO { get; set; } = new CreateMeterDto();
        public CreateCustomerDto CustomerDTO { get; set; } = new CreateCustomerDto();
    }
}
