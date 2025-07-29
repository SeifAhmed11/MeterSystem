using MeterSystem.Core.Responses;

namespace MeterSystem.Core.Services
{
    public abstract class BaseService
    {
        protected Guid GenerateId() => Guid.NewGuid();
        protected DateTime GetCurrentTime() => DateTime.UtcNow;

        protected BaseResponse<T> Success<T>(T data, string message = "") =>
            BaseResponse<T>.SuccessResult(data, message);

        protected BaseResponse<T> Fail<T>(string message) =>
            BaseResponse<T>.FailResult(message);
    }
}
