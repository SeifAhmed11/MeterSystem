using MeterSystem.Common.DTOs.Recharge;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RechargeController : ControllerBase
    {
        private readonly IRechargeService _rechargeService;
        private readonly ILogger<RechargeController> _logger;

        public RechargeController(IRechargeService rechargeService, ILogger<RechargeController> logger)
        {
            _rechargeService = rechargeService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReacharge([FromBody] CreateRechargeDto dto)
        {
            _logger.LogInformation("POST /Recharge - CreateRecharge called with: {@dto}", dto);

            var response = await _rechargeService.CreateAsync(dto);

            if (!response.Success)
            {
                _logger.LogWarning("Recharge creation failed: {Message}", response.Message);
                return BadRequest(response.Message);
            }

            _logger.LogInformation("Recharge created successfully.");
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecharge()
        {
            _logger.LogInformation("GET /Recharge - GetAllRecharge called");

            var response = await _rechargeService.GetAllAsync();

            await Task.Delay(6000); 

            if (!response.Success)
            {
                _logger.LogWarning("Failed to retrieve all recharges: {Message}", response.Message);
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("{SerialId}")]
        public async Task<IActionResult> GetAllRechargeByMeterId(string SerialId)
        {
            _logger.LogInformation("GET /Recharge/{SerialId} - Called with SerialId: {SerialId}", SerialId);

            var response = await _rechargeService.GetAllAsync(r => r.Meter.Serial == SerialId);

            if (!response.Success)
            {
                _logger.LogWarning("Failed to retrieve recharges by meter: {Message}", response.Message);
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("GetLastCharge/{serial}")]
        public async Task<IActionResult> GetLastCharge(string serial)
        {
            _logger.LogInformation("GET /Recharge/GetLastCharge/{serial} - Called with serial: {serial}", serial);

            var response = await _rechargeService.GetLastCharge(serial);

            if (!response.Success)
            {
                _logger.LogWarning("Failed to retrieve last charge: {Message}", response.Message);
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("FilterByDate")]
        public async Task<IActionResult> GetRechargesByDate([FromQuery] string? serial, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            _logger.LogInformation("GET /Recharge/FilterByDate - Called with serial: {serial}, from: {from}, to: {to}", serial, from, to);

            var response = await _rechargeService.GetByDate(serial, from, to);

            if (!response.Success)
            {
                _logger.LogWarning("Failed to filter recharges by date: {Message}", response.Message);
                return BadRequest(response.Message);
            }

            return Ok(response);
        }
    }
}
