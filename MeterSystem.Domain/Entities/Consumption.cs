namespace MeterSystem.Domain.Entities
{
    public class Consumption
    {
        public Guid Id { get; set; }
        public DateTime ReadingDate { get; set; }
        public decimal PreviousReading { get; set; }
        public decimal CurrentReading { get; set; }
        public decimal ConsumptionUnits { get; set; }
        //relation with User
        //relation with meter
    }
}
