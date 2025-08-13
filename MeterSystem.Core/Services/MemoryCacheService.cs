using MeterSystem.Common.Interfaces.IServices;
using Microsoft.Extensions.Caching.Memory;

namespace MeterSystem.Core.Services
{
    public class MemoryCacheService : IMemoryCacheService
    {
        private readonly IMemoryCache _cache;

        public MemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public T? Get<T>(string key) =>
            _cache.TryGetValue(key, out T value) ? value : default;
        
        public void Remove(string key) =>
            _cache.Remove(key);
     
        public void Set<T>(string key, T value, TimeSpan expiration) => 
            _cache.Set(key, value, expiration);
    }
}
