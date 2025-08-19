using MeterSystem.Common.Enum;

namespace MeterSystem.Common.DTOs.User
{
    public class RegisterDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NationalId { get; set; } = string.Empty;
    }
}
