
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Seeders;
using Microsoft.AspNetCore.Identity;
using OfficeOpenXml;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File(
        path: "Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
    )
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();


//var builder = WebApplication.CreateBuilder(args);

//Log.Logger = new LoggerConfiguration()
//    //.MinimumLevel.Debug()
//    //.WriteTo.Console()
//    //.WriteTo.Seq("http://localhost:5341")
//    .Enrich.FromLogContext()
//    .CreateLogger();

//builder.Host.UseSerilog();


//Log.Information("Starting up the application...");

// Database setup
builder.Services.AddDbContextPool<MeterSystemDbContext>((serviceProvider, options) =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//.AddInterceptors(serviceProvider.GetRequiredService<SoftDeleteInterceptor>()));

// Dependency Injection for Core and Infrastructure layers
builder.Services.RegisterInfrastructure(builder.Configuration);
builder.Services.RegisterCore();

// Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

    await RoleSeeder.SeedRolesAsync(roleManager);
    await SeedSuperAdmin.SeederSuperAdmin(userManager, roleManager);
}

// HTTP request pipeline
if (app.Environment.IsDevelopment())
 {
     app.UseSwagger();
     app.UseSwaggerUI();
 }

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<RequestTimingMiddleware>();

app.MapControllers();

app.Run();