# Components Directory

This directory contains Angular components for the Meter System application.

## Structure

- `auth/` - Authentication components (login, register)
- `dashboard/` - Dashboard and overview components
- `layout/` - Layout components (header, sidebar, footer)
- `customers/` - Customer management components
- `meters/` - Meter management components
- `contracts/` - Contract management components
- `recharges/` - Recharge management components
- `consumptions/` - Consumption management components
- `users/` - User management components
- `shared/` - Reusable shared components

## Usage

Import components in your modules:

```typescript
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
```

## Guidelines

- Use OnPush change detection when possible
- Implement proper lifecycle hooks
- Use proper typing
- Include proper error handling
- Follow Angular component best practices
- Keep components focused and single-purpose
- Use proper component communication patterns
