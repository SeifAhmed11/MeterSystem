using Microsoft.AspNetCore.Http;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private const int TimeoutMilliseconds = 5000;

    public RequestTimingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        using var cts = new CancellationTokenSource();
        cts.CancelAfter(TimeoutMilliseconds); 

        var token = cts.Token;

        try
        {
            var task = _next(context);

            if (await Task.WhenAny(task, Task.Delay(TimeoutMilliseconds, token)) == task)
            {
                await task;
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status408RequestTimeout;
                await context.Response.WriteAsync("Request timed out.");
                Console.WriteLine($"Request to {context.Request.Path} exceeded {TimeoutMilliseconds}ms and was terminated.");
                return;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception during request to {context.Request.Path}: {ex.Message}");
            throw;
        }
        finally
        {
            stopwatch.Stop();
            Console.WriteLine($"Request to {context.Request.Path} took {stopwatch.ElapsedMilliseconds} ms");
        }
    }
}
