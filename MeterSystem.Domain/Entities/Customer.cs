namespace MeterSystem.Domain.Entities
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string NationalId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public ICollection<Consumption> Recharges { get; set; }
        public ICollection<Consumption> Consumptions { get; set; }
        public ICollection<Contract> Contracts { get; set; }
        
        //created by user

    }
}
