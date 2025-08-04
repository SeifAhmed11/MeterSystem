using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Interfaces.IServices;
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
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);

        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllContract()
        {
            var response = await _contractService.GetAllAsync();
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("GetAllDeleted")]
        public async Task<IActionResult> GetAllDeletedContract()
        {
            var response = await _contractService.GetAllAsync(filter: c => c.IsDeleted == true,ignoreQueryFilters:true);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContractById(Guid id)
        {
            var response = await _contractService.GetByOneAsync(x => x.Id == id);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("by-customer-code/{customerCode}")]
        public async Task<IActionResult> GetContractByCustomerCode(string customerCode)
        {
            var response = await _contractService.GetByOneAsync(x => x.CustomerCode == customerCode);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("by-National-id/{nationalId}")]
        public async Task<IActionResult> GetContractByNationalId(string nationalId)
        {
            var response = await _contractService.GetAllAsync(c => c.Customer.NationalId == nationalId);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("by-Meter-serial/{meterSerial}")]
        public async Task<IActionResult> GetContractByMeterSerial(string meterSerial)
        {
            var response = await _contractService.GetAllAsync(c => c.Meter.Serial == meterSerial);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContractByCustomerCode([FromBody] UpdateContractDto dto)
        {
            var response = await _contractService.UpdateAsync(dto);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContractById(Guid id)
        {
            var response = await _contractService.DeleteAsync(id);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> RecoverDeletedContract(Guid id)
        {
            var response = await _contractService.RecoverContract(id);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomerDetailsReportAsync(DateTime from, DateTime to,string? customerCode = null,
            string? meterSerial = null)
        {
            var response = await _contractService.GetCustomerDetailsReportAsync(from, to, customerCode, meterSerial);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

    }
}
