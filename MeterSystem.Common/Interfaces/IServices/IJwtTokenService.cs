using MeterSystem.Domain.Entities;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user, IList<string> roles);
    }
}
