using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeterSystem.Domain.Entities;
using MeterSystem.Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace MeterSystem.Infrastructure.Data
{
    public class MeterSystemDbContext : DbContext
    {

        public MeterSystemDbContext(DbContextOptions<MeterSystemDbContext> options) : base(options)
        {
        }
        public DbSet<Meter> Meters { get; set; } = default!;
        public DbSet<Recharge> Recharges { get; set; } = default!;
        public DbSet<Consumption> Consumptions { get; set; } = default!;
        public DbSet<Customer> Customers { get; set; } = default!;
        public DbSet<Contract> Contracts { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MeterConfiguration());
            modelBuilder.ApplyConfiguration(new RechargeConfiguration());
            modelBuilder.ApplyConfiguration(new ConsumptionConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ContractConfiguration());

            base.OnModelCreating(modelBuilder);
        }

    }
}
