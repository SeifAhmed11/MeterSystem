
using System.ComponentModel.DataAnnotations;

namespace MeterSystem.Common.DTOs.Recharge
{
    public class CreateRechargeDto
    {
        [Range(1,500)]
        public decimal Amount { get; set; }
        public Guid MeterId { get; set; }
    }
}
