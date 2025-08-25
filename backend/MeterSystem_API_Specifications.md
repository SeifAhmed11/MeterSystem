# Meter System API - مواصفات المشروع

## نظرة عامة

### الهدف من المشروع
نظام إدارة العدادات الكهربائية/المائية الذي يتيح إدارة العملاء والعقود والعدادات وإعادة الشحن واستهلاك الطاقة.

### المشكلة التي يحلها
- إدارة معقدة للعملاء والعقود
- تتبع استهلاك الطاقة والعدادات
- إدارة عمليات إعادة الشحن
- تتبع تاريخ القراءات والاستهلاك

### المستخدمين الأساسيين (Roles)
- **SuperAdmin**: صلاحيات كاملة على النظام
- **Admin**: إدارة المستخدمين والعملاء والعقود
- **User**: عرض البيانات والعمليات الأساسية

## البنية (Architecture)

### Clean/Onion Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│                    (Controllers)                           │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│                    (Services)                              │
├─────────────────────────────────────────────────────────────┤
│                    Domain Layer                             │
│                    (Entities, Interfaces)                  │
├─────────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                       │
│                  (DbContext, Repositories)                 │
└─────────────────────────────────────────────────────────────┘
```

### وظيفة كل طبقة
- **Presentation**: Controllers - استقبال الطلبات وإرجاع الاستجابات
- **Application**: Services - منطق الأعمال والمعاملات
- **Domain**: Entities - نماذج البيانات الأساسية
- **Infrastructure**: Data Access - قاعدة البيانات والعمليات الخارجية

## الأمن والتوثيق

### نوع التوثيق
- **JWT (JSON Web Token)** للتوثيق
- **Bearer Token** في Header: `Authorization: Bearer {token}`

### إدارة الأدوار
```csharp
[Authorize(Roles = nameof(UserRoles.SuperAdmin))]
[Authorize(Roles = nameof(UserRoles.Admin))]
```

### صلاحيات المسارات
- **Public**: Register, Login
- **Protected**: جميع العمليات الأخرى تتطلب JWT صالح
- **Role-based**: بعض العمليات تتطلب أدوار محددة

## الاستجابات القياسية

### تنسيق الاستجابة الموحد
```json
{
  "data": {},
  "message": "string",
  "success": true/false
}
```

### أمثلة الاستجابات
```json
// نجاح
{
  "data": { "id": "guid", "name": "string" },
  "message": "تم إنشاء العنصر بنجاح",
  "success": true
}

// فشل
{
  "data": null,
  "message": "حدث خطأ في العملية",
  "success": false
}
```

## قائمة Endpoints كاملة

### 1. Authentication

#### POST /api/user/login
**الوصف**: تسجيل دخول المستخدم  
**المدخلات**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**الاستجابة**:
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "guid",
      "email": "user@example.com",
      "roles": ["Admin"]
    }
  },
  "message": "تم تسجيل الدخول بنجاح",
  "success": true
}
```
**الأخطاء**: 400 (بيانات غير صحيحة), 401 (غير مصرح)

#### POST /api/user/register
**الوصف**: تسجيل مستخدم جديد  
**المدخلات**:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "nationalId": "1234567890"
}
```
**الاستجابة**: BaseResponse<string>
**الأخطاء**: 400 (بيانات غير صحيحة), 409 (مستخدم موجود)

### 2. Users Management

#### GET /api/user/pending-admins
**الوصف**: الحصول على قائمة المشرفين المعلقين  
**الصلاحيات**: SuperAdmin فقط  
**المدخلات**: لا يوجد  
**الاستجابة**: قائمة PendingUserDto  
**الأخطاء**: 401 (غير مصرح), 403 (غير مسموح)

#### POST /api/user/confirm-admin-email
**الوصف**: تأكيد بريد المشرف  
**الصلاحيات**: SuperAdmin فقط  
**المدخلات**:
```json
{
  "email": "admin@example.com"
}
```
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400 (بيانات غير صحيحة), 401, 403

### 3. Customers Management

#### GET /api/customer
**الوصف**: الحصول على قائمة العملاء  
**المدخلات**: Query Parameters (search, page, pageSize, sortBy)  
**الاستجابة**: قائمة CustomerDto مع Pagination  
**الأخطاء**: 401, 500

#### GET /api/customer/{id}
**الوصف**: الحصول على عميل محدد  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: CustomerDto  
**الأخطاء**: 400, 401, 404, 500

#### POST /api/customer
**الوصف**: إنشاء عميل جديد  
**المدخلات**:
```json
{
  "nationalId": "1234567890",
  "name": "أحمد محمد",
  "address": "شارع الملك فهد، الرياض"
}
```
**الاستجابة**: CustomerDto  
**الأخطاء**: 400, 401, 409, 500

#### PUT /api/customer/{id}
**الوصف**: تحديث بيانات العميل  
**المدخلات**: Path Parameter (id: Guid) + Request Body  
**الاستجابة**: CustomerDto  
**الأخطاء**: 400, 401, 404, 500

#### DELETE /api/customer/{id}
**الوصف**: حذف العميل (Soft Delete)  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400, 401, 404, 500

### 4. Meters Management

#### GET /api/meter
**الوصف**: الحصول على قائمة العدادات  
**المدخلات**: Query Parameters (search, page, pageSize, sortBy, type)  
**الاستجابة**: قائمة MeterDto مع Pagination  
**الأخطاء**: 401, 500

#### GET /api/meter/{id}
**الوصف**: الحصول على عداد محدد  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: MeterDto  
**الأخطاء**: 400, 401, 404, 500

#### POST /api/meter
**الوصف**: إنشاء عداد جديد  
**المدخلات**:
```json
{
  "serial": "MTR001",
  "type": "Electric",
  "installedDate": "2024-01-01T00:00:00Z"
}
```
**الاستجابة**: MeterDto  
**الأخطاء**: 400, 401, 409, 500

#### PUT /api/meter/{id}
**الوصف**: تحديث بيانات العداد  
**المدخلات**: Path Parameter (id: Guid) + Request Body  
**الاستجابة**: MeterDto  
**الأخطاء**: 400, 401, 404, 500

#### DELETE /api/meter/{id}
**الوصف**: حذف العداد (Soft Delete)  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400, 401, 404, 500

### 5. Contracts Management

#### GET /api/contract
**الوصف**: الحصول على قائمة العقود  
**المدخلات**: Query Parameters (search, page, pageSize, sortBy, customerId, meterId)  
**الاستجابة**: قائمة ContractDto مع Pagination  
**الأخطاء**: 401, 500

#### GET /api/contract/{id}
**الوصف**: الحصول على عقد محدد  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: ContractDto  
**الأخطاء**: 400, 401, 404, 500

#### POST /api/contract
**الوصف**: إنشاء عقد جديد  
**المدخلات**:
```json
{
  "customerCode": "CUST001",
  "installationAddress": "شارع الملك فهد، الرياض",
  "activationDate": "2024-01-01T00:00:00Z",
  "fixedFees": 50.00,
  "meterId": "guid",
  "customerId": "guid"
}
```
**الاستجابة**: ContractDto  
**الأخطاء**: 400, 401, 409, 500

#### PUT /api/contract/{id}
**الوصف**: تحديث بيانات العقد  
**المدخلات**: Path Parameter (id: Guid) + Request Body  
**الاستجابة**: ContractDto  
**الأخطاء**: 400, 401, 404, 500

#### DELETE /api/contract/{id}
**الوصف**: حذف العقد (Soft Delete)  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400, 401, 404, 500

### 6. Recharges Management

#### GET /api/recharge
**الوصف**: الحصول على قائمة عمليات إعادة الشحن  
**المدخلات**: Query Parameters (search, page, pageSize, sortBy, meterId, startDate, endDate)  
**الاستجابة**: قائمة RechargeDto مع Pagination  
**الأخطاء**: 401, 500

#### GET /api/recharge/{id}
**الوصف**: الحصول على عملية إعادة شحن محددة  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: RechargeDto  
**الأخطاء**: 400, 401, 404, 500

#### POST /api/recharge
**الوصف**: إنشاء عملية إعادة شحن جديدة  
**المدخلات**:
```json
{
  "amount": 100.00,
  "meterId": "guid"
}
```
**الاستجابة**: RechargeDto  
**الأخطاء**: 400, 401, 409, 500

#### PUT /api/recharge/{id}
**الوصف**: تحديث بيانات إعادة الشحن  
**المدخلات**: Path Parameter (id: Guid) + Request Body  
**الاستجابة**: RechargeDto  
**الأخطاء**: 400, 401, 404, 500

#### DELETE /api/recharge/{id}
**الوصف**: حذف عملية إعادة الشحن (Soft Delete)  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400, 401, 404, 500

### 7. Consumptions Management

#### GET /api/consumption
**الوصف**: الحصول على قائمة استهلاك الطاقة  
**المدخلات**: Query Parameters (search, page, pageSize, sortBy, meterId, startDate, endDate)  
**الاستجابة**: قائمة ConsumptionDto مع Pagination  
**الأخطاء**: 401, 500

#### GET /api/consumption/{id}
**الوصف**: الحصول على استهلاك محدد  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: ConsumptionDto  
**الأخطاء**: 400, 401, 404, 500

#### POST /api/consumption
**الوصف**: إنشاء قراءة استهلاك جديدة  
**المدخلات**:
```json
{
  "readingDate": "2024-01-01T00:00:00Z",
  "previousReading": 100.0,
  "currentReading": 150.0,
  "consumptionUnits": 50.0,
  "meterId": "guid"
}
```
**الاستجابة**: ConsumptionDto  
**الأخطاء**: 400, 401, 409, 500

#### PUT /api/consumption/{id}
**الوصف**: تحديث بيانات الاستهلاك  
**المدخلات**: Path Parameter (id: Guid) + Request Body  
**الاستجابة**: ConsumptionDto  
**الأخطاء**: 400, 401, 404, 500

#### DELETE /api/consumption/{id}
**الوصف**: حذف قراءة الاستهلاك (Soft Delete)  
**المدخلات**: Path Parameter (id: Guid)  
**الاستجابة**: BaseResponse<string>  
**الأخطاء**: 400, 401, 404, 500

## الميزات الإضافية

### البحث والتصفية
```http
GET /api/customer?search=أحمد&page=1&pageSize=10&sortBy=name
GET /api/meter?type=Electric&page=1&pageSize=20
GET /api/consumption?startDate=2024-01-01&endDate=2024-01-31
```

### الترقيم (Pagination)
```json
{
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "pageSize": 20,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### الترتيب (Sorting)
- `sortBy`: اسم الحقل للترتيب
- `sortOrder`: `asc` أو `desc`

## ملاحظات للفرونت إند

### Headers المطلوبة
```http
Authorization: Bearer {JWT_TOKEN}
Accept-Language: ar (أو en)
Content-Type: application/json
```

### التعامل مع الأخطاء
```json
// 400 Bad Request
{
  "data": null,
  "message": "بيانات غير صحيحة",
  "success": false,
  "errors": {
    "email": ["البريد الإلكتروني مطلوب"],
    "password": ["كلمة المرور يجب أن تكون 6 أحرف على الأقل"]
  }
}

// 401 Unauthorized
{
  "data": null,
  "message": "JWT token غير صالح",
  "success": false
}

// 403 Forbidden
{
  "data": null,
  "message": "ليس لديك صلاحية للوصول لهذا المورد",
  "success": false
}

// 404 Not Found
{
  "data": null,
  "message": "العنصر غير موجود",
  "success": false
}

// 500 Internal Server Error
{
  "data": null,
  "message": "حدث خطأ داخلي في الخادم",
  "success": false
}
```

### حالات التطبيق
- **Loading**: أثناء إرسال الطلب
- **Empty**: عندما تكون القائمة فارغة
- **Error**: عند حدوث خطأ
- **Success**: عند نجاح العملية

## هيكلة المشروع

### الفولدرات الرئيسية
```
MeterSystem/
├── MeterSystem.API/           # Presentation Layer
│   ├── Controllers/          # Controllers
│   ├── Middleware/           # Custom Middleware
│   └── Program.cs            # Application Entry Point
├── MeterSystem.Core/          # Application Layer
│   ├── Services/             # Business Logic Services
│   └── MeterSystemCoreRegister.cs
├── MeterSystem.Domain/        # Domain Layer
│   ├── Entities/             # Domain Models
│   ├── Base/                 # Base Classes
│   └── Interfaces/           # Domain Interfaces
├── MeterSystem.Infrastructure/ # Infrastructure Layer
│   ├── Data/                 # Database Context
│   ├── Repositories/         # Data Access
│   ├── Configurations/       # Entity Configurations
│   └── Migrations/           # Database Migrations
└── MeterSystem.Common/        # Shared Components
    ├── DTOs/                 # Data Transfer Objects
    ├── Enums/                # Enumerations
    ├── Interfaces/            # Service Interfaces
    └── Base/                 # Base Response Classes
```

### الملفات المهمة
- **Program.cs**: إعداد التطبيق والخدمات
- **MeterSystemDbContext.cs**: سياق قاعدة البيانات
- **BaseEntity.cs**: الكيان الأساسي مع الحقول المشتركة
- **BaseResponse.cs**: تنسيق الاستجابة الموحد

## أمثلة عملية

### تسجيل الدخول
```bash
curl -X POST "https://api.metersystem.com/api/user/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@metersystem.com",
    "password": "Admin123!"
  }'
```

### إنشاء عميل جديد
```bash
curl -X POST "https://api.metersystem.com/api/customer" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: ar" \
  -d '{
    "nationalId": "1234567890",
    "name": "أحمد محمد علي",
    "address": "شارع الملك فهد، الرياض، المملكة العربية السعودية"
  }'
```

### الحصول على قائمة العملاء مع البحث
```bash
curl -X GET "https://api.metersystem.com/api/customer?search=أحمد&page=1&pageSize=10&sortBy=name" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Accept-Language: ar"
```

## ملاحظات تقنية

### قاعدة البيانات
- **SQL Server** مع Entity Framework Core
- **Code First** approach مع Migrations
- **Soft Delete** لجميع الكيانات
- **Audit Fields**: CreatedAt, UpdatedAt, IsDeleted

### التوثيق
- **Swagger/OpenAPI** متاح في بيئة التطوير
- **JWT Bearer Token** مطلوب لجميع العمليات المحمية
- **Localization** مدعوم (العربية والإنجليزية)

### الأمان
- **HTTPS** مطلوب في الإنتاج
- **CORS** مُعد للفرونت إند
- **Rate Limiting** متاح
- **Request Logging** مع Serilog

---

*هذا المستند محدث بتاريخ: 2024-01-19*
*الإصدار: 1.0*
*المطور: Meter System Team*

