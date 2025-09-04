# 📊 MeterSystem

**MeterSystem** is an enterprise-grade system for managing meters, contracts, and bills with advanced reporting and export features (PDF/Excel).
It is built using **.NET 8 (Clean Architecture)** for the backend and **Angular** for the frontend.

---

## ✨ Key Features

### 🔹 Backend (.NET 8 API)

* 🔐 **Authentication & Authorization**

  * JWT-based authentication.
  * Role-based access: `Admin`, `SuperAdmin`.
  * Default `SuperAdmin` created via data seeding.

* 📑 **Contracts Management**

  * Full CRUD operations.
  * **Soft Delete & Recover** functionality.
  * Advanced filtering:

    * Date range
    * Customer code
    * Meter serial number

* 📊 **Reports & Export**

  * Customer details report via **Stored Procedure**.
  * Export options:

    * **PDF** using iTextSharp/iText7
    * **Excel** using EPPlus

* ⚡ **Caching**

  * In-Memory caching.
  * Redis caching support (extendable).

* ⚙️ **Middleware**

  * Request timing middleware (track response times).

* 📝 **Logging**

  * Integrated **Serilog**.
  * Logs to **files** and **Seq**.

* 🗄️ **Database Layer**

  * Entity Framework Core with `DbContext`.
  * **Generic Repository + UnitOfWork**.
  * Stored procedure integration.

* 📚 **APIs & Documentation**

  * RESTful API endpoints.
  * **Swagger UI** for interactive documentation.

---

### 🔹 Frontend (Angular)

* 🔐 **Authentication**

  * Login module with JWT integration.
  * Route guards for secured pages.

* 📊 **Dashboard**

  * System overview and statistics.

* 📦 **Modules**

  * **Customers** – manage customer records.
  * **Contracts** – create, update, delete, recover contracts.
  * **Meters** – manage meters.
  * **Readings** – record meter readings.
  * **Bills** – generate and track bills.

* 📑 **Reports**

  * Detailed reports with filters.
  * Export as **PDF** or **Excel**.

* ⚙️ **Settings**

  * General system configuration.

* 🖥️ **Tech Highlights**

  * Angular 17+
  * RxJS for reactive programming
  * Reactive Forms with validation
  * Angular Material UI components
  * HTTP Interceptors for request handling
  * Toastr/MatSnackBar notifications

---

## 🛠️ Tech Stack

### Backend

* .NET 8 Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* iText7 / EPPlus
* Serilog
* Redis (optional)

### Frontend

* Angular 17+
* RxJS
* Angular Material
* Reactive Forms
* Toastr / MatSnackBar

---

## 📂 Project Structure

```
MeterSystem/
│── MeterSystem.API/            # API Layer (Controllers, Middlewares)
│── MeterSystem.Core/           # Business Logic (Services, Interfaces)
│── MeterSystem.Common/         # DTOs, Enums, Mappings
│── MeterSystem.Domain/         # Entities
│── MeterSystem.Infrastructure/ # EF Core, Repositories, UnitOfWork
│── frontend/                   # Angular Frontend
```

---

## ▶️ Getting Started

### Backend

```bash
cd MeterSystem.API
dotnet restore
dotnet ef database update   # Apply migrations
dotnet run
```

### Frontend

```bash
cd frontend
npm install
ng serve -o
```


---

## 👨‍💻 Author

Developed by **Seif Ahmed**
