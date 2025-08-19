using MeterSystem.Common.DTOs.User;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IUserService
    {
        Task<LoginResponse> login(LoginDto dto);
    }
}
