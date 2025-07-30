using MeterSystem.Common.Interfaces;
using MeterSystem.Infrastructure.Data;
using MeterSystem.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MeterSystem.Infrastructure
{
    public static class MeterSystemInfraRegister
    {
        public static void RegisterInfrastructure(this IServiceCollection services) 
        { 
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
