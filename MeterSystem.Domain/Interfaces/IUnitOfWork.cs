using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Domain.Interfaces
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
