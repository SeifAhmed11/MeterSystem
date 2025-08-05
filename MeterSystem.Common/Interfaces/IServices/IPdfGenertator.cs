
namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IPdfGenertator
    {
        byte[] GeneratePdf<T>(IEnumerable<T> data, Dictionary<string, Func<T, object?>> columns, string title = "Report");
    }
}

