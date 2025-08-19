using MeterSystem.Common.Constants;
using MeterSystem.Common.DTOs.User;
using MeterSystem.Common.Enum;
using MeterSystem.Common.Interfaces.IServices;
using MeterSystem.Common.Mapping;
using MeterSystem.Common.Responses;
using MeterSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace MeterSystem.Core.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IDistributedCache _cache;
        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJwtTokenService jwtTokenService,
            IDistributedCache cache)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = jwtTokenService;
            _cache = cache;
        }
        public async Task<BaseResponse<LoginResponse>> login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return BaseResponse<LoginResponse>.FailResult(StaticMessages.NotFound);

            else if (user.EmailConfirmed == false)
            {
                return BaseResponse<LoginResponse>.FailResult(StaticMessages.Invalid);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded)
                return BaseResponse<LoginResponse>.FailResult(StaticMessages.Invalid);

            var cacheKey = $"roles_{user.Id}";
            var rolesJson = await _cache.GetStringAsync(cacheKey);
            List<string> roles;

            if (string.IsNullOrEmpty(rolesJson))
            {
                // Fetch roles from DB
                roles = (await _userManager.GetRolesAsync(user)).ToList();

                // Store in Redis for 30 min
                await _cache.SetStringAsync(cacheKey,
                 JsonSerializer.Serialize(roles),
                 new DistributedCacheEntryOptions
                 {
                     AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
                 });
            }
            else
            {
             
                roles = JsonSerializer.Deserialize<List<string>>(rolesJson)!;
            }
            var token = _jwtTokenService.GenerateToken(user, roles);

            var response = new LoginResponse
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(60)
            };

            return BaseResponse<LoginResponse>.SuccessResult(response, StaticMessages.Loaded);
        }

        public async Task<BaseResponse<string>> Register(RegisterDto dto)
        {
            var existingEmail = await _userManager.FindByEmailAsync(dto.Email);
            var existingUserName = await _userManager.FindByNameAsync(dto.UserName);
            if (existingEmail != null || existingUserName != null)
            {
                return BaseResponse<string>.FailResult(StaticMessages.AlreadyExists);
            }

            var user = dto.ToEntity();
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BaseResponse<string>.FailResult(StaticMessages.AlreadyExists);
            }
            await _userManager.AddToRoleAsync(user, UserRoles.Admin.ToString());
            await _userManager.UpdateAsync(user);

            if (!user.EmailConfirmed)
            {
                return BaseResponse<string>.SuccessResult(StaticMessages.Created);
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenService.GenerateToken(user, roles);

            return BaseResponse<string>.SuccessResult(StaticMessages.Created, token);
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
