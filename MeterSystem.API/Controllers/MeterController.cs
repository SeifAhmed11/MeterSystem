using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterController : ControllerBase
    {
        private readonly IMeterService _meterService;
        public MeterController(IMeterService meterService)
        {
            _meterService = meterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMeters()
        {
            var response = await _meterService.GetAllAsync();
            if (!response.Success)
                return BadRequest(response);
            return Ok(response);
        }

        [HttpGet("{serial}")]
        public async Task<IActionResult> GetCustomerBySerial(string serial)
        {
            var response = await _meterService.GetOneAsync(m =>m.Serial == serial);
            if (!response.Success)
                return BadRequest(response);
            return Ok(response);
        }
    }
}
