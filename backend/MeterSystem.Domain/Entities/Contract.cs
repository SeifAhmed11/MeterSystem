using MeterSystem.Domain.Base;

namespace MeterSystem.Domain.Entities
{
    public class Contract : BaseEntity
    {
        public string CustomerCode { get; set; } = default!;
        public string InstallationAddress { get; set; } = default!;
        public DateTime ActivationDate { get; set; }
        public decimal FixedFees { get; set; }
        public Guid MeterId { get; set; }
        public Meter Meter { get; set; } = default!;
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; } = default!;
        //created by user
        
    }
}
