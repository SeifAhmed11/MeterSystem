using MeterSystem.Common.DTOs.Contract;
using MeterSystem.Common.Enum;
using MeterSystem.Common.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;

namespace MeterSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly ILogger<ContractController> _logger;
        private readonly IContractService _contractService;
        private readonly IPdfGeneratorService _pdfGeneratorService;
        private readonly IExcelServices _excelExportService;
        public ContractController(IContractService contractService, IPdfGeneratorService pdfGeneratorService,
            IExcelServices excelExportService, ILogger<ContractController> logger)
        {
            _contractService = contractService;
            _excelExportService = excelExportService;
            _pdfGeneratorService = pdfGeneratorService;
            _logger = logger;
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
        public async Task<IActionResult> GetCustomerDetailsReportAsync([FromQuery] ContractFilterDto dto)
        {
            var response = await _contractService.GetCustomerDetailsReportAsync(dto.from, dto.to, dto.customerCode, dto.meterSerial);
            if (!response.Success)
                return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportCustomerDetails([FromQuery] ContractPdfFilter dto)
        {
            _logger.LogInformation("Filters used: CustomerCode = {CustomerCode}, MeterSerial = {MeterSerial}", dto.customerCode ?? "N/A", dto.meterSerial ?? "N/A");

            var response = await _contractService.GetCustomerDetailsReportAsync(dto.from, dto.to, dto.customerCode, dto.meterSerial);

            if (!response.Success || response.Data == null || response.Data.Count == 0)
            {
                _logger.LogWarning("Export failed: no data found for the given filters.");
                return BadRequest(response.Message);
            }

            var fileNameBase = $"CustomerDetails_{DateTime.Now:yyyyMMddHHmmss}";
            
            if (dto.type == (int)ExportType.PDF)
            {
                var pdfBytes = _pdfGeneratorService.GeneratePdf(response.Data, fileNameBase);
                return File(pdfBytes, "application/pdf", $"{fileNameBase}.pdf");
            }
            else if (dto.type == (int)ExportType.EXCEL)
            {
                var excelBytes = _excelExportService.GenerateExcel(response.Data, fileNameBase);
                return File(
                        excelBytes,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{fileNameBase}.xlsx");
            }

            _logger.LogError("Unsupported export type fallback triggered.");
            return BadRequest(response.Message);
        }
    }
}
