using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var response = await _customerService.GetAllAsync();
            if (!response.Success)
                return BadRequest(response);
            return Ok(response);
        }

        [HttpGet("{nationalId}")]
        public async Task<IActionResult> GetCustomerByNationalId(string nationalId)
        {
            var response = await _customerService.GetOneAsync(c => c.NationalId == nationalId);
            if (!response.Success)
                return BadRequest(response);
            return Ok(response);
        }
    }
}
