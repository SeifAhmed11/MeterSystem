# صفحة التقارير - الميزات والوظائف

## نظرة عامة
تم إنشاء صفحة تقارير شاملة تتيح عرض وتصدير جميع البيانات من النظام مع دعم جميع الـ endpoints المتاحة.

## الميزات الرئيسية:

### 1. أنواع التقارير المتاحة:
- **تقرير العملاء** - `/customer`
- **تقرير العدادات** - `/meter`
- **تقرير العقود** - `/contract`
- **تقرير الشحنات** - `/recharge`
- **تقرير الاستهلاك** - `/consumption`
- **تقرير المستخدمين** - `/user`

### 2. وظائف البحث والتصفية:
- **البحث النصي**: البحث في جميع الحقول
- **الترقيم**: عرض البيانات بصفحات مع إمكانية التنقل
- **حجم الصفحة**: قابل للتعديل (10 عناصر افتراضياً)

### 3. تصدير البيانات:
- **تصدير CSV**: تحميل التقرير كملف CSV
- **تنسيق البيانات**: تنسيق التواريخ والقيم المنطقية
- **ترجمة الأعمدة**: عرض أسماء الأعمدة بالعربية

### 4. واجهة المستخدم:
- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **تحميل تدريجي**: مؤشر تحميل أثناء جلب البيانات
- **عرض منظم**: جدول منظم مع أعمدة قابلة للتمرير

## الـ Endpoints المستخدمة:

### العملاء:
```
GET /api/customer
- Parameters: search, page, pageSize, sortBy, sortOrder
- Response: PaginatedResponse<CustomerDto>
```

### العدادات:
```
GET /api/meter
- Parameters: search, page, pageSize, sortBy, sortOrder, type, isAvailable
- Response: PaginatedResponse<MeterDto>
```

### العقود:
```
GET /api/contract
- Parameters: search, page, pageSize, sortBy, sortOrder
- Response: PaginatedResponse<ContractDto>
```

### الشحنات:
```
GET /api/recharge
- Parameters: search, page, pageSize, sortBy, sortOrder
- Response: PaginatedResponse<RechargeDto>
```

### الاستهلاك:
```
GET /api/consumption
- Parameters: search, page, pageSize, sortBy, sortOrder
- Response: PaginatedResponse<ConsumptionDto>
```

### المستخدمين:
```
GET /api/user/all
- Parameters: search, page, pageSize, sortBy, sortOrder
- Response: PaginatedResponse<UserDto>
```

## الملفات المنشأة:

### المكونات:
- `src/app/components/reports/reports.component.ts`
- `src/app/components/reports/reports.component.html`
- `src/app/components/reports/reports.component.scss`

### التحديثات:
- `src/app/app.module.ts` - إضافة مكون التقارير
- `src/app/app-routing.module.ts` - إضافة مسار `/reports`
- `src/app/components/dashboard/dashboard-enhanced.component.html` - إضافة زر التقارير

## كيفية الاستخدام:

1. **الوصول للصفحة**: 
   - من لوحة التحكم → زر "التقارير"
   - أو مباشرة: `/reports`

2. **اختيار التقرير**:
   - اختر نوع التقرير من القائمة المنسدلة
   - سيتم تحميل البيانات تلقائياً

3. **البحث والتصفية**:
   - اكتب في حقل البحث للبحث في البيانات
   - استخدم أزرار التنقل للانتقال بين الصفحات

4. **تصدير البيانات**:
   - اضغط على زر "تصدير CSV" لتحميل التقرير

## الميزات التقنية:

### الأمان:
- **حماية المسار**: يتطلب تسجيل دخول (AuthGuard)
- **صلاحيات المستخدم**: يمكن إضافة صلاحيات محددة

### الأداء:
- **تحميل تدريجي**: البيانات تُحمل عند الطلب فقط
- **ترقيم**: تقليل حجم البيانات المحملة
- **تخزين مؤقت**: يمكن إضافة تخزين مؤقت للبيانات

### القابلية للتوسع:
- **إضافة تقارير جديدة**: سهولة إضافة أنواع تقارير جديدة
- **تخصيص الأعمدة**: إمكانية تخصيص عرض الأعمدة
- **تصدير إضافي**: يمكن إضافة تصدير PDF أو Excel

## ملاحظات:
- جميع الـ endpoints تدعم البحث والترقيم
- البيانات تُعرض بتنسيق عربي مناسب
- يمكن تخصيص حجم الصفحة حسب الحاجة
- التصدير يدعم جميع أنواع البيانات
