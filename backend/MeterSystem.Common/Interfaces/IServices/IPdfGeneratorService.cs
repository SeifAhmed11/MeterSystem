
namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IPdfGeneratorService
    {
        byte[] GeneratePdf<T>(IEnumerable<T> data, string title = "Report");
    }
}

