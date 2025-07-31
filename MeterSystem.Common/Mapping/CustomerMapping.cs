using MeterSystem.Common.DTOs.Customer;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Core.Mapping
{
    public static class CustomerMapping
    {
        public static CustomerDto ToDto(this Customer customer)
        {
            return new CustomerDto
            {
                Id = customer.Id,
                NationalId = customer.NationalId,
                Name = customer.Name,
                Address = customer.Address,
                CreatedAt = customer.CreatedAt,
                UpdatedAt = customer.UpdatedAt,
                NumberOfContracts = customer.Contracts?.Count ?? 0
            };
        }

        public static Customer ToEntity(this CreateCustomerDto dto)
        {
            return new Customer
            {
                NationalId = dto.NationalId,
                Name = dto.Name,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow,
            };
        }

        public static void MapToEntity(this UpdateCustomerDto dto, Customer customer)
        {
            customer.Name = dto.Name;
            customer.Address = dto.Address;
            customer.UpdatedAt = DateTime.UtcNow;
        }

    }
}
