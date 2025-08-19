using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MeterSystem.Infrastructure.Data
{
    public class MeterSystemDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {

        public MeterSystemDbContext(DbContextOptions<MeterSystemDbContext> options) : base(options)
        {
        }
        public DbSet<Meter> Meters { get; set; } = default!;
        public DbSet<Recharge> Recharges { get; set; } = default!;
        public DbSet<Consumption> Consumptions { get; set; } = default!;
        public DbSet<Customer> Customers { get; set; } = default!;
        public DbSet<Contract> Contracts { get; set; } = default!;
        public DbSet<DetailsDto> CustomerDetailsResult { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MeterConfiguration());
            modelBuilder.ApplyConfiguration(new RechargeConfiguration());
            modelBuilder.ApplyConfiguration(new ConsumptionConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ContractConfiguration());

            modelBuilder.Entity<DetailsDto>().HasNoKey();
            modelBuilder.Entity<Contract>().HasQueryFilter(b => b.IsDeleted == false);
            modelBuilder.Entity<Customer>().HasQueryFilter(b => b.IsDeleted == false);
            modelBuilder.Entity<Meter>().HasQueryFilter(b => b.IsDeleted == false);
            modelBuilder.Entity<Recharge>().HasQueryFilter(b => b.IsDeleted == false);
            modelBuilder.Entity<Consumption>().HasQueryFilter(b => b.IsDeleted == false);



            base.OnModelCreating(modelBuilder);
        }

    }
}
