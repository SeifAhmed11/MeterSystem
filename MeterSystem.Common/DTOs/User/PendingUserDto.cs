namespace MeterSystem.Common.DTOs.User
{
    public class PendingUserDto
    {
        public PendingUserDto(string? userName, string? email, bool emailConfirmed)
        {
            UserName = userName;
            Email = email;
            EmailConfirmed = emailConfirmed;
        }

        public string? UserName { get; set; }
        public string? Email { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}
