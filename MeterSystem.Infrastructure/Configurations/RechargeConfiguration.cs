using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeterSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MeterSystem.Infrastructure.Configurations
{
    public class RechargeConfiguration : IEntityTypeConfiguration<Recharge>
    {
        public void Configure(EntityTypeBuilder<Recharge> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                   .HasColumnName("recharge_id")
                   .HasDefaultValueSql("NEWID()");

            builder.Property(r => r.Amount)
                   .HasColumnType("decimal(10,2)")
                   .IsRequired();

            builder.Property(r => r.RechargeDate).IsRequired();
            builder.Property(r => r.CreatedAt).IsRequired();

            builder.HasOne(r => r.Meter)
                   .WithMany(m => m.Recharges)
                   .HasForeignKey(r => r.MeterId);

            builder.HasOne(r => r.Customer)
                   .WithMany(m => m.Recharges)
                   .HasForeignKey(r => r.CustomerId);
        }
    }
}
