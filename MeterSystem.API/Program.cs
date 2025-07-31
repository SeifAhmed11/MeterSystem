
using MeterSystem.Infrastructure.Interceptors;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContextPool<MeterSystemDbContext>((ServiceProvider, options) =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
    .AddInterceptors(ServiceProvider.GetRequiredService<SoftDeleteInterceptor>()));
// Add services to the container. 

//builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

builder.Services.RegisterInfrastructure();
builder.Services.RegisterCore();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
