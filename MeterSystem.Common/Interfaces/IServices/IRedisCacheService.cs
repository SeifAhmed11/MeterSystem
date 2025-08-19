namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IRedisCacheService
    {
        Task SetCacheAsync(string key, string value);
        Task<string?> GetCacheAsync(string key);
    }
}
