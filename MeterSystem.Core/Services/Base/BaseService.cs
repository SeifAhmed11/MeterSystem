using MeterSystem.Core.Responses;

namespace MeterSystem.Core.Services.Base
{
    public abstract class BaseService
    {
        protected BaseResponse<T> Success<T>(T data, string message = "") =>
            BaseResponse<T>.SuccessResult(data, message);

        protected BaseResponse<T> Fail<T>(string message) =>
            BaseResponse<T>.FailResult(message);
    }
}
