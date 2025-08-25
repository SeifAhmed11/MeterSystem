using MeterSystem.Common.Interfaces.IServices;
using Microsoft.Extensions.Caching.Distributed;

namespace MeterSystem.Core.Services
{
    public class RedisCacheService : IRedisCacheService
    {
        private readonly IDistributedCache _cache;

        public RedisCacheService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<string?> GetCacheAsync(string key)
        {
            return await _cache.GetStringAsync(key);
        }

        public async Task SetCacheAsync(string key, string value)
        {
            await _cache.SetStringAsync(key, value, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            });
        }
    }
}
