

var builder = WebApplication.CreateBuilder(args);

//  Serilog 
Log.Logger = new LoggerConfiguration()
    //.MinimumLevel.Debug()
    .WriteTo.Console()
    //.WriteTo.Seq("http://localhost:5341")
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();


Log.Information("Starting up the application...");

// Database setup
builder.Services.AddDbContextPool<MeterSystemDbContext>((serviceProvider, options) =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//.AddInterceptors(serviceProvider.GetRequiredService<SoftDeleteInterceptor>()));

// Dependency Injection for Core and Infrastructure layers
builder.Services.RegisterInfrastructure();
builder.Services.RegisterCore();

// Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// HTTP request pipeline
 if (app.Environment.IsDevelopment())
 {
     app.UseSwagger();
     app.UseSwaggerUI();
 }

app.UseHttpsRedirection();
 app.UseAuthorization();
 app.MapControllers();

app.Run();