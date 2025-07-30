using MeterSystem.Domain.Entities;
using MeterSystem.Common.Interfaces;
using MeterSystem.Infrastructure.Repositories;

namespace MeterSystem.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private MeterSystemDbContext _context;

        public IGenericRepository<Meter> Meters { get; }

        public IGenericRepository<Recharge> Recharges { get; }

        public IGenericRepository<Consumption> Consumptions { get; }

        public IGenericRepository<Customer> Customers { get; }

        public IGenericRepository<Contract> Contracts { get; }

        public UnitOfWork(MeterSystemDbContext context)
        {
            _context = context;
            Meters = new GenericRepository<Meter>(_context);
            Recharges = new GenericRepository<Recharge>(_context);
            Consumptions = new GenericRepository<Consumption>(_context);
            Customers = new GenericRepository<Customer>(_context);
            Contracts = new GenericRepository<Contract>(_context);
        }

        public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}
