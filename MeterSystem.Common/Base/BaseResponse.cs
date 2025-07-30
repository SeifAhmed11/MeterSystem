namespace MeterSystem.Common.Responses
{
    public class BaseResponse<T>
    {
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }

        public static BaseResponse<T> SuccessResult(T data, string message = "") =>
        new() { Success = true, Data = data, Message = message };

        public static BaseResponse<T> FailResult(string message) =>
            new() { Success = false, Message = message };
    }
}
