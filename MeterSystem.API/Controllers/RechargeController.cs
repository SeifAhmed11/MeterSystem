using MeterSystem.Common.DTOs.Recharge;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RechargeController : ControllerBase
    {
        private readonly IRechargeService _rechargeService;
        public RechargeController(IRechargeService rechargeService)
        {
            _rechargeService = rechargeService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateReacharge([FromBody] CreateRechargeDto dto)
        {
            var response = await _rechargeService.CreateAsync(dto);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecharge()
        {
            var response = await _rechargeService.GetAllAsync();
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }
    
        [HttpGet("{SerialId}")]
        public async Task<IActionResult> GetAllRechargeByMeterId(string SerialId)
        {
            var response = await _rechargeService.GetAllAsync(r => r.Meter.Serial == SerialId);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("GetLastCharge/{serial}")]
        public async Task<IActionResult> GetLastCharge(string serial)
        {
            var response = await _rechargeService.GetLastCharge(serial);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("FilterByDate")]
        public async Task<IActionResult> GetRechargesByDate([FromQuery] string? serial, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var response = await _rechargeService.GetByDateRangeAsync(serial, from, to);
            if (!response.Success)
                return BadRequest(response.Message);

            return Ok(response);
        }
    }
}
