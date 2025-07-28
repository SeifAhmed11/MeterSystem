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
    public class MeterConfiguration : IEntityTypeConfiguration<Meter>
    {
        public void Configure(EntityTypeBuilder<Meter> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Id)
                   .HasColumnName("meter_id")
                   .HasDefaultValueSql("NEWID()");

            builder.Property(m => m.Serial)
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(m => m.Type)
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(m => m.InstalledDate).IsRequired();
            builder.Property(m => m.CreatedAt).IsRequired();
            builder.Property(m => m.UpdatedAt).IsRequired();

            builder.HasMany(m => m.Recharges)
                   .WithOne(r => r.Meter)
                   .HasForeignKey(r => r.MeterId);

            builder.HasMany(m => m.Consumptions)
                   .WithOne(c => c.Meter)
                   .HasForeignKey(c => c.MeterId);

            builder.HasOne(m => m.Contract)
                   .WithOne(c => c.Meter)
                   .HasForeignKey<Contract>(c => c.MeterId);


        }
    }
}
