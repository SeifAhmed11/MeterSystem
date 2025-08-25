
namespace MeterSystem.Common.DTOs.Contract
{
    public class DetailsDto
    {
        public string? Name { get; set; }
        public string? Customer_Code { get; set; }
        public string? Serial { get; set; }
        public int Recharge_Count { get; set; }
        public decimal Total_Amount { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? Last_Recharge_Date { get; set; }
        public decimal? Last_Recharge_Amount { get; set; }
    }
}
