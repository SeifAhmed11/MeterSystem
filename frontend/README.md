# Meter System Frontend (Angular)

## Overview
A modern Angular application for managing electric and water meters. Includes authentication, dashboards, CRUD screens, and reporting. The UI is RTL-friendly and optimized for Arabic, but all code, docs, and structure follow standard Angular best practices.

## Features
- Authentication with JWT (interceptor included)
- Protected routes (guards)
- Dashboard with key stats
- CRUD: Customers, Meters, Contracts, Recharges, Consumptions, Users
- Reports page with search, pagination, CSV export
- Responsive layout (header, sidebar)
- SCSS styling and theming

## Tech Stack
- Angular 17
- TypeScript
- RxJS
- Angular Material
- SCSS

## Getting Started
### Prerequisites
- Node.js v18+
- npm (or yarn)

### Install
```bash
npm install
```

### Run (Dev)
```bash
npm start
# App runs at http://localhost:4200
```

### Build (Prod)
```bash
npm run build
```

## Project Structure
```
src/
  app/
    components/
      auth/          # Login, Register
      dashboard/     # Dashboard
      layout/        # Header, Sidebar
      customers/     # Customers CRUD
      meters/        # Meters CRUD
      contracts/     # Contracts CRUD
      recharges/     # Recharges CRUD
      consumptions/  # Consumptions CRUD
      reports/       # Reports page
      shared/        # Shared components (e.g., toast)
    guards/          # Route guards
    interceptors/    # HTTP interceptors
    models/          # Interfaces & DTOs
    services/        # API services
  assets/            # Images & static
  styles/            # Global styles
```

## Configuration
Environment files are under `src/environments/`.
- `environment.ts` (dev)
- `environment.prod.ts` (prod)

Set your API base URL as `apiUrl`.

## Scripts
```bash
npm start         # Run dev server
npm run build     # Build for production
npm test          # Run unit tests (if configured)
```

## Key Modules
- `guards/` — `auth.guard.ts` protects routes
- `interceptors/` — `auth.interceptor.ts` attaches JWT & handles 401
- `services/` — API calls per domain (customer, meter, contract, etc.)
- `components/reports/` — unified reporting UI with search/pagination/export

## Reports Page
- Select report type (customers, meters, contracts, recharges, consumptions, users)
- Search, paginate, and export CSV
- Secured by `AuthGuard`

## Coding Guidelines
- Strong typing (no `any`)
- Small, focused components and services
- Proper error handling in services and interceptors
- Follow Angular Style Guide

## License
MIT

## Support
- Issues: open a ticket on your repository host
- Docs: Angular (`https://angular.io/docs`) and Material (`https://material.angular.io`)





