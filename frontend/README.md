# نظام إدارة العدادات - Meter System Frontend

## 🎨 نظرة عامة

مشروع Angular جميل وعصري لنظام إدارة العدادات الكهربائية والمائية. تم تصميمه بألوان رائعة وتأثيرات بصرية مذهلة لمسابقة أفضل تصميم.

## ✨ المميزات

- 🎨 **تصميم عصري وجميل** مع ألوان متدرجة وتأثيرات بصرية
- 📱 **متوافق مع جميع الأجهزة** (Responsive Design)
- 🌙 **دعم الوضع المظلم** (Dark Mode)
- 🔐 **نظام مصادقة آمن** مع JWT
- 📊 **لوحة تحكم تفاعلية** مع إحصائيات حية
- 🔔 **نظام إشعارات متقدم** مع رسائل وإشعارات
- 🔍 **بحث ذكي** مع اقتراحات فورية
- 📋 **إدارة شاملة** للعملاء والعدادات والعقود
- 📈 **تقارير ورسوم بيانية** متقدمة
- 🎭 **حركات وتأثيرات** سلسة

## 🚀 التقنيات المستخدمة

- **Angular 17** - إطار العمل الرئيسي
- **Angular Material** - مكونات Material Design
- **SCSS** - معالج CSS متقدم
- **TypeScript** - لغة البرمجة
- **RxJS** - برمجة تفاعلية
- **Chart.js** - الرسوم البيانية
- **Font Awesome** - الأيقونات
- **Google Fonts** - الخطوط العربية

## 🎨 الألوان والتصميم

### نظام الألوان
- **الألوان الأساسية**: تدرجات الأزرق والأرجواني
- **الألوان الثانوية**: تدرجات البرتقالي والوردي
- **ألوان النجاح**: تدرجات الأخضر
- **ألوان التحذير**: تدرجات الأصفر
- **ألوان الخطأ**: تدرجات الأحمر

### التأثيرات البصرية
- **تدرجات لونية** (Gradients) جميلة
- **ظلال متقدمة** مع تأثيرات العمق
- **حركات سلسة** مع CSS Transitions
- **تأثيرات Hover** تفاعلية
- **أيقونات متحركة** مع CSS Animations

## 📁 هيكل المشروع

```
meter-system-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/           # صفحات المصادقة
│   │   │   ├── dashboard/      # لوحة التحكم
│   │   │   ├── layout/         # تخطيط الصفحة
│   │   │   ├── customers/      # إدارة العملاء
│   │   │   ├── meters/         # إدارة العدادات
│   │   │   ├── contracts/      # إدارة العقود
│   │   │   ├── recharges/      # إدارة إعادة الشحن
│   │   │   └── consumptions/   # إدارة الاستهلاك
│   │   ├── services/           # الخدمات
│   │   ├── guards/             # حماية المسارات
│   │   ├── interceptors/       # معالجات HTTP
│   │   └── models/             # النماذج
│   ├── assets/                 # الملفات الثابتة
│   └── styles/                 # ملفات التصميم
├── package.json
├── angular.json
└── README.md
```

## 🛠️ التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd meter-system-frontend
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **تشغيل المشروع**
```bash
npm start
```

4. **فتح المتصفح**
```
http://localhost:4200
```

### أوامر مفيدة

```bash
# تشغيل المشروع
npm start

# بناء المشروع للإنتاج
npm run build

# تشغيل الاختبارات
npm test

# فحص الكود
npm run lint
```

## 🔧 الإعدادات

### متغيرات البيئة
قم بإنشاء ملف `.env` في مجلد المشروع:

```env
# API Configuration
API_BASE_URL=http://localhost:5000
API_TIMEOUT=30000

# Authentication
JWT_SECRET=your-jwt-secret
TOKEN_EXPIRY=24h

# App Configuration
APP_NAME=Meter System
APP_VERSION=1.0.0
DEFAULT_LANGUAGE=ar
```

### إعدادات Angular Material
المشروع يستخدم Angular Material مع ثيم مخصص. يمكنك تغيير الثيم في `angular.json`:

```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
  ]
}
```

## 📱 المكونات الرئيسية

### 1. صفحة تسجيل الدخول
- تصميم جميل مع خلفية متدرجة
- نموذج تسجيل دخول متقدم
- تأثيرات بصرية مذهلة
- دعم اللغة العربية

### 2. لوحة التحكم
- إحصائيات حية مع بطاقات ملونة
- رسوم بيانية تفاعلية
- نشاطات حديثة
- إجراءات سريعة

### 3. الشريط الجانبي
- قائمة تنقل ذكية
- إمكانية الطي والتوسيع
- معلومات المستخدم
- أيقونات جميلة

### 4. الهيدر
- شريط بحث متقدم
- إشعارات تفاعلية
- رسائل المستخدمين
- قائمة المستخدم

## 🎯 الميزات المتقدمة

### نظام البحث
- بحث فوري مع اقتراحات
- تصفية متقدمة
- تاريخ البحث
- نتائج ذكية

### الإشعارات
- إشعارات في الوقت الفعلي
- أنواع مختلفة من الإشعارات
- تحديد الكل كمقروء
- إعدادات الإشعارات

### الرسائل
- نظام رسائل داخلي
- محادثات فورية
- إشعارات الرسائل الجديدة
- أرشيف الرسائل

## 🌐 دعم اللغات

المشروع يدعم اللغة العربية بشكل كامل:
- اتجاه النص من اليمين لليسار (RTL)
- خطوط عربية جميلة (Cairo, Tajawal)
- ترجمة كاملة للواجهة
- تنسيق التواريخ والأرقام العربية

## 📊 الأداء

### تحسينات الأداء
- **Lazy Loading** للمكونات
- **Tree Shaking** لإزالة الكود غير المستخدم
- **Code Splitting** لتقسيم الحزمة
- **Service Workers** للتخزين المؤقت
- **Image Optimization** لتحسين الصور

### مقاييس الأداء
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 الأمان

### ميزات الأمان
- **JWT Authentication** مع تجديد تلقائي
- **Route Guards** لحماية المسارات
- **Role-based Access Control**
- **CSRF Protection**
- **XSS Prevention**
- **Secure HTTP Headers**

## 🧪 الاختبارات

### أنواع الاختبارات
- **Unit Tests** مع Jasmine/Karma
- **Integration Tests**
- **E2E Tests** مع Protractor
- **Visual Regression Tests**

### تشغيل الاختبارات
```bash
# جميع الاختبارات
npm test

# الاختبارات مع التغطية
npm run test:coverage

# الاختبارات E2E
npm run e2e
```

## 📦 النشر

### بناء المشروع
```bash
# بناء للإنتاج
npm run build:prod

# بناء مع تحسينات
npm run build:optimized
```

### النشر على الخوادم
- **Netlify**: سحب تلقائي من Git
- **Vercel**: نشر فوري
- **Firebase Hosting**: استضافة Google
- **AWS S3**: استضافة Amazon

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. إجراء التغييرات
4. إضافة الاختبارات
5. إنشاء Pull Request

### معايير الكود
- استخدام TypeScript
- اتباع Angular Style Guide
- كتابة تعليقات واضحة
- اختبار جميع الميزات الجديدة

## 📞 الدعم

### طرق التواصل
- **Email**: support@metersystem.com
- **GitHub Issues**: للإبلاغ عن المشاكل
- **Discord**: للمحادثات المباشرة
- **Documentation**: للدليل الكامل

### الموارد المفيدة
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للتفاصيل.

## 🙏 الشكر

شكر خاص لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**تم التطوير بواسطة فريق Meter System** 🚀

*آخر تحديث: أغسطس 2025*





