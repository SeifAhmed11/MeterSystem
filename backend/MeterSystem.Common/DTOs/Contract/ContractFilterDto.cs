
using System.ComponentModel.DataAnnotations;

namespace MeterSystem.Common.DTOs.Contract
{
    public class ContractFilterDto
    {
        public DateTime from { get; set; }
        public DateTime to { get; set; }
        public string? customerCode { get; set; }
        public string? meterSerial { get; set; }
    }

    public class ContractPdfFilter : ContractFilterDto
    {
        [Range(0,1)]
        public int type { get; set; }
    }
}
