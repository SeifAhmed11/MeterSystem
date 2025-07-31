using System.ComponentModel.DataAnnotations;
using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Common.DTOs.Meter;

namespace MeterSystem.Common.DTOs.Contract
{
    public class CreateContractDto
    {
        public string InstallationAddress { get; set; } = default!;
        public DateTime ActivationDate { get; set; }
        public decimal FixedFees { get; set; }
        public bool IsActive { get; set; }
        public CreateMeterDto MeterDTO { get; set; } = new CreateMeterDto();
        public CreateCustomerDto CustomerDTO { get; set; } = new CreateCustomerDto();
    }

}
