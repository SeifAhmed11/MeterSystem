using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly IContractService _contractService;
        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateContract([FromBody] CreateContractDto dto)
        {
            var response = await _contractService.CreateAsync(dto);
            if(!response.Success)
                return BadRequest(response.Message);
            return Ok(response);

        }

        [HttpGet]
        public async Task<IActionResult> GetAllContract()
        {
            var response = await _contractService.GetAllAsync();
            if(!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdContract(Guid id)
        {
            var response = await _contractService.GetByOneAsync(x => x.Id == id);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }
    }
}
