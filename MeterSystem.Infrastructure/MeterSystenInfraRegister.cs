using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeterSystem.Domain.Interfaces;
using MeterSystem.Infrastructure.Data;
using MeterSystem.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MeterSystem.Infrastructure
{
    public static class MeterSystenInfraRegister
    {
        public static void Register(this IServiceCollection services) 
        { 
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
