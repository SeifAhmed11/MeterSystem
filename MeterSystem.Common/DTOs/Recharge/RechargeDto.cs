using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.DTOs.Meter;

namespace MeterSystem.Common.DTOs.Recharge
{
    public class RechargeDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime RechargeDate { get; set; }

        public Guid MeterId { get; set; }
        public Guid CustomerId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public MeterDto? Meter { get; set; }
        public CustomerDto? Customer { get; set; }
    }
}
