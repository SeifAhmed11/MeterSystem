using MeterSystem.Domain.Base;

namespace MeterSystem.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string NationalId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
        public ICollection<Consumption> Consumptions { get; set; }  = default!;
        public ICollection<Contract> Contracts { get; set; } = default!;
        
        //created by user

    }
}
