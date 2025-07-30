using MeterSystem.Domain.Entities;

namespace MeterSystem.Common.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<Meter> Meters { get; }
        IGenericRepository<Recharge> Recharges { get; }
        IGenericRepository<Consumption> Consumptions { get; }
        IGenericRepository<Customer> Customers { get; }
        IGenericRepository<Contract> Contracts { get; }

        Task<int> SaveChangesAsync();
    }
}
