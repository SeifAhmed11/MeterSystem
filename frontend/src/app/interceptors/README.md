# Interceptors Directory

This directory contains HTTP interceptors for the Meter System application.

## Structure

- `auth.interceptor.ts` - JWT token interceptor
- `error.interceptor.ts` - Error handling interceptor
- `logging.interceptor.ts` - Request/response logging
- `cache.interceptor.ts` - Response caching
- `retry.interceptor.ts` - Request retry logic

## Usage

Register interceptors in your app module:

```typescript
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
```

## Guidelines

- Implement HttpInterceptor interface
- Handle errors gracefully
- Use proper typing
- Include proper error handling
- Follow Angular HTTP best practices
- Keep interceptors focused and single-purpose





