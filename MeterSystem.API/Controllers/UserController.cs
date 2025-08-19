using MeterSystem.Common.DTOs.User;
using System;
using MeterSystem.Common.Enum;
using Microsoft.AspNetCore.Authorization;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using MeterSystem.Common.Responses;
using MeterSystem.Common.Constants;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var response = await _userService.login(request);
            if (!response.Success)
                return Unauthorized(response.Message);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            var response = await _userService.Register(request);
            if(!response.Success)
                return BadRequest(response.Message);

            return Ok(response);
        }


        [HttpGet("pending-admins")]
        public async Task<ActionResult<IReadOnlyList<PendingUserDto>>> GetPendingAdmins()
        {
            var list = await _userService.GetUnconfirmedAdminsAsync();
            return Ok(list);
        }

        [HttpPost("confirm-admin-email")]
        [Authorize(Roles = nameof(UserRoles.SuperAdmin))]
        public async Task<ActionResult<BaseResponse<string>>> ConfirmAdminEmail([FromBody] ConfirmEmailRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Email))
                return BadRequest(BaseResponse<string>.FailResult(StaticMessages.Required));

            var response = await _userService.ConfirmAdminEmailBySuperAsync(req.Email);
            if (!response.Success) return BadRequest(response);

            return Ok(response);
        }

    }
}
