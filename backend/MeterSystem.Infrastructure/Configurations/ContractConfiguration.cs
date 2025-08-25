using MeterSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MeterSystem.Infrastructure.Configurations
{
    public class ContractConfiguration : IEntityTypeConfiguration<Contract>
    {
        public void Configure(EntityTypeBuilder<Contract> builder)
        {
            builder.ToTable("contracts");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();

            builder.Property(c => c.CustomerCode)
                .HasColumnName("customer_code")
                .IsRequired();

            builder.Property(c => c.InstallationAddress)
                .HasColumnName("address")
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(c => c.ActivationDate)
                .HasColumnName("activation_date")
                .IsRequired();

            builder.Property(c => c.FixedFees)
                .HasColumnName("fixed_fees")
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(c => c.CreatedAt)
               .HasColumnName("CreatedAt")
               .IsRequired();

            builder.Property(c => c.UpdatedAt)
                .HasColumnName("UpdatedAt");

            builder.HasOne(c => c.Customer)
                .WithMany(cust => cust.Contracts)
                .HasForeignKey(c => c.CustomerId);

            builder.HasOne(c => c.Meter)
                .WithOne(m => m.Contract)
                .HasForeignKey<Contract>(c => c.MeterId); 
        }
    }
}
