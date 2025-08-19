
using MeterSystem.Common.DTOs.User;
using MeterSystem.Common.Enum;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Responses;
using MeterSystem.Common.Constants;
using MeterSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace MeterSystem.Core.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = jwtTokenService;
        }
        public async Task<LoginResponse> login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.username);

            if (user == null)
                return null;

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.password, false);
            if (!result.Succeeded)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenService.GenerateToken(user, roles);

            return new LoginResponse
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(60)
            };
        }

        public async Task<IReadOnlyList<PendingUserDto>> GetUnconfirmedAdminsAsync()
        {
            var admins = await _userManager.GetUsersInRoleAsync(nameof(UserRoles.Admin));

            var pending = admins
                .Where(u => !u.EmailConfirmed)
                .Select(u => new PendingUserDto(
                    u.UserName,
                    u.Email,
                    u.EmailConfirmed
                ))
                .ToList();

            return pending;
        }


        public async Task<BaseResponse<string>> ConfirmAdminEmailBySuperAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user is null) return BaseResponse<string>.FailResult($"User {StaticMessages.NotFound}");

            if (!await _userManager.IsInRoleAsync(user, nameof(UserRoles.Admin)))
                return BaseResponse<string>.FailResult($"User {StaticMessages.Invalid}");

            if (user.EmailConfirmed) return BaseResponse<string>.SuccessResult(StaticMessages.Updated);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
            {
                return BaseResponse<string>.FailResult(StaticMessages.Invalid);
            }
            return BaseResponse<string>.SuccessResult(StaticMessages.Updated);
        }

    }
}
