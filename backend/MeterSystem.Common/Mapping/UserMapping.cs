using MeterSystem.Common.DTOs.User;
using MeterSystem.Domain.Entities;

namespace MeterSystem.Common.Mapping
{
    public static class UserMapping
    {
        public static User ToEntity(this RegisterDto dto)
        {
            return new User()
            {
                UserName = dto.UserName,
                Email = dto.Email,
                NationalId = dto.NationalId,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false
            };
        }
    }
}
