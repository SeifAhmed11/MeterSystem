using MeterSystem.Common.DTOs.User;
using MeterSystem.Common.Responses;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IUserService
    {
        Task<BaseResponse<LoginResponse>> login(LoginDto dto);
        Task<BaseResponse<string>> Register(RegisterDto dto);
    }
}
