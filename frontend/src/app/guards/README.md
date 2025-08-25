# Guards Directory

This directory contains Angular route guards for the Meter System application.

## Structure

- `auth.guard.ts` - Authentication guard
- `role.guard.ts` - Role-based access control guard
- `admin.guard.ts` - Admin-only access guard
- `super-admin.guard.ts` - Super admin access guard

## Usage

Apply guards in your routing configuration:

```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['Admin', 'SuperAdmin'] }
}
```

## Guidelines

- Return boolean or UrlTree
- Handle async operations properly
- Provide clear error messages
- Use dependency injection
- Follow Angular routing best practices
- Include proper error handling





