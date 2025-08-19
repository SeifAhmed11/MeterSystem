using MeterSystem.Common.DTOs.User;
using System.Collections.Generic;
using MeterSystem.Common.Responses;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IUserService
    {
        Task<LoginResponse> login(LoginDto dto);
        Task<IReadOnlyList<PendingUserDto>> GetUnconfirmedAdminsAsync();
        Task<BaseResponse<string>> ConfirmAdminEmailBySuperAsync(string email);
    }
}
