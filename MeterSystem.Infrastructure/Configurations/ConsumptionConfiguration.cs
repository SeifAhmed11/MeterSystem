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
    public class ConsumptionConfiguration : IEntityTypeConfiguration<Consumption>
    {
        public void Configure(EntityTypeBuilder<Consumption> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                   .HasColumnName("consumption_id")
                   .HasDefaultValueSql("NEWID()");

            builder.Property(c => c.ReadingDate).IsRequired();

            builder.Property(c => c.PreviousReading)
                   .HasColumnType("decimal(12,3)")
                   .IsRequired();

            builder.Property(c => c.CurrentReading)
                   .HasColumnType("decimal(12,3)")
                   .IsRequired();

            builder.Property(c => c.ConsumptionUnits)
                   .HasColumnType("decimal(12,3)")
                   .IsRequired();

            builder.HasOne(c => c.Meter)
                   .WithMany(m => m.Consumptions)
                   .HasForeignKey(c => c.MeterId);
        }
    }
}
