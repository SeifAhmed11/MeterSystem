using MeterSystem.Domain.Base;
using Microsoft.AspNetCore.Identity;

namespace MeterSystem.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string NationalId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
