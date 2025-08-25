using System.Text;
using MeterSystem.Common.Interfaces;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Data;
using MeterSystem.Infrastructure.Repositories;
using MeterSystem.Infrastructure.Seeders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens; // إن لزم

public static class MeterSystemInfraRegister
{
    public static void RegisterInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddIdentity<User, IdentityRole<Guid>>(options =>
        {
            options.SignIn.RequireConfirmedEmail = true;
            options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
        })
        .AddEntityFrameworkStores<MeterSystemDbContext>()
        .AddDefaultTokenProviders();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings["Key"]))
            };
        });

        services.AddScoped<RoleSeeder>();
        services.AddScoped<SeedSuperAdmin>();
        //services.AddSingleton<SoftDeleteInterceptor>();

        // ❌ أوقف Redis
        //services.AddStackExchangeRedisCache(options =>
        //{
        //    options.Configuration = "localhost:6379"; 
        //    options.InstanceName = "MeterSystem_";    
        //});

        // ✅ استخدم كاش داخل الذاكرة بدلًا منه
        services.AddDistributedMemoryCache();
    }
}
