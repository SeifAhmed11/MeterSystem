using MeterSystem.Application.Services;
using MeterSystem.Core.Services;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.Extensions.DependencyInjection;


namespace MeterSystem.Core
{
    public static class MeterSystemCoreRegister
    {
        public static void RegisterCore(this IServiceCollection services)
        {
            services.AddScoped<IContractService, ContractService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IMeterService, MeterService>();
            services.AddScoped<IRechargeService, RechargeService>();
            services.AddScoped<IExcelServices, ExcelServices>();
        }
    }
}
