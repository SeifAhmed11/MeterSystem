
using MeterSystem.Common.DTOs.Meter;

namespace MeterSystem.Common.DTOs.Contract
{
    public class UpdateContractDto
    {
        public Guid? Id { get; set; }
        public string InstallationAddress { get; set; } = default!;
        public decimal FixedFees { get; set; }
        public UpdateMeterDto MeterDTO { get; set; } = default!;
    }
}
