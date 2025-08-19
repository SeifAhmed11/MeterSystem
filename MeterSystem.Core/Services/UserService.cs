
using MeterSystem.Common.DTOs.User;
using MeterSystem.Common.Interfaces.IServices;
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
    }
}
