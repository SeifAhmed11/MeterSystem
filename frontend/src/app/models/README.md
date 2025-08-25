# Models Directory

This directory contains TypeScript interfaces and models for the Meter System application.

## Structure

- `user.model.ts` - User-related interfaces
- `customer.model.ts` - Customer-related interfaces
- `meter.model.ts` - Meter-related interfaces
- `contract.model.ts` - Contract-related interfaces
- `recharge.model.ts` - Recharge-related interfaces
- `consumption.model.ts` - Consumption-related interfaces
- `api.model.ts` - API response interfaces
- `common.model.ts` - Common/shared interfaces

## Usage

Import models in your components and services:

```typescript
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';
```

## Guidelines

- Use descriptive interface names
- Include JSDoc comments for complex properties
- Make properties optional when appropriate
- Use union types for enums
- Extend base interfaces when possible
- Keep models focused and single-purpose





