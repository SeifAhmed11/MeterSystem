using System.Linq;
using MeterSystem.Common.Interfaces;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Repositories;

namespace MeterSystem.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MeterSystemDbContext dbContext;
        private readonly Dictionary<Type, object> repositories = new();
        public UnitOfWork(MeterSystemDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IGenericRepository<T> Repository<T>() where T : class
        {
            var type = typeof(T);
            if (!repositories.ContainsKey(type))
            {
                var repoInstance = new GenericRepository<T>(dbContext);
                repositories[type] = repoInstance;
            }
            return (IGenericRepository<T>)repositories[type];
        }

        public async Task<int> SaveChangesAsync() => await dbContext.SaveChangesAsync();
    }
}
