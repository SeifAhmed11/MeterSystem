using MeterSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MeterSystem.Infrastructure.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("customers");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id)
                .HasColumnName("customer_id")
                .ValueGeneratedOnAdd();

            builder.Property(c => c.NationalId)
                .HasColumnName("national_id")
                .IsRequired()
                .HasMaxLength(14);
            builder.HasIndex(c => c.NationalId)
                .IsUnique();

            builder.Property(c => c.Name)
                .HasColumnName("name")
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Address)
                .HasColumnName("address")
                .HasMaxLength(200);

            builder.Property(c => c.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired();

            builder.Property(c => c.LastUpdatedAt)
                .HasColumnName("last_updated_at");
                
            builder.HasMany(c => c.Contracts)
                .WithOne(con => con.Customer)
                .HasForeignKey(con => con.CustomerId);
        }
    }
}
