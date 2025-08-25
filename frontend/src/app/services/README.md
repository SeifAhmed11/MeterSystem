# Services Directory

This directory contains Angular services for the Meter System application.

## Structure

- `auth.service.ts` - Authentication and authorization
- `customer.service.ts` - Customer management
- `meter.service.ts` - Meter management
- `contract.service.ts` - Contract management
- `recharge.service.ts` - Recharge management
- `consumption.service.ts` - Consumption management
- `user.service.ts` - User management
- `notification.service.ts` - Notification handling
- `storage.service.ts` - Local storage management
- `api.service.ts` - Base API service

## Usage

Inject services in your components:

```typescript
constructor(
  private authService: AuthService,
  private customerService: CustomerService
) {}
```

## Guidelines

- Use dependency injection
- Handle errors gracefully
- Return observables for async operations
- Use proper typing
- Include error handling
- Follow Angular best practices
- Keep services focused and single-purpose





