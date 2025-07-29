using MeterSystem.Application.Services;
using MeterSystem.Core.Services;
using MeterSystem.Core.Services.Interfaces;
using MeterSystem.Domain.Interfaces.IServices;
using Microsoft.Extensions.DependencyInjection;


namespace MeterSystem.Core
{
    public static class MeterSystemCoreRegister
    {
        public static void RegisterCore(this IServiceCollection services)
        {
            services.AddScoped<IMeterService, MeterService>();
            services.AddScoped<IRechargeService, RechargeService>();
            services.AddScoped<IConsumptionService, ConsumptionService>();
        }
    }
}
