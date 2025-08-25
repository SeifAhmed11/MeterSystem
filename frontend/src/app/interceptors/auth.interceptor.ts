import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // الحصول على الرمز المميز
    const token = this.authService.getToken();

    // إضافة الرمز المميز إلى الطلب إذا كان متوفراً
    let authReq = req;
    if (token && !this.isPublicEndpoint(req.url)) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // إضافة headers إضافية
    authReq = authReq.clone({
      headers: authReq.headers
        .set('Accept-Language', 'ar')
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With')
    });

    // معالجة الطلب والاستجابة
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * التحقق من كون المسار عام (لا يحتاج مصادقة)
   */
  private isPublicEndpoint(url: string): boolean {
    const publicEndpoints = [
      '/user/login',
      '/user/register',
      '/user/forgot-password',
      '/user/reset-password'
    ];

    return publicEndpoints.some(endpoint => url.includes(endpoint));
  }

  /**
   * معالجة أخطاء HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ غير متوقع';

    if (error.error instanceof ErrorEvent) {
      // خطأ في العميل أو الشبكة
      errorMessage = `خطأ في الشبكة: ${error.error.message}`;
    } else {
      // خطأ في الخادم
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'بيانات غير صحيحة';
          break;
        case 401:
          errorMessage = 'غير مصرح لك بالوصول';
          this.handleUnauthorized();
          break;
        case 403:
          errorMessage = 'ليس لديك صلاحية للوصول لهذا المورد';
          break;
        case 404:
          errorMessage = 'المورد المطلوب غير موجود';
          break;
        case 409:
          errorMessage = error.error?.message || 'تعارض في البيانات';
          break;
        case 422:
          errorMessage = error.error?.message || 'بيانات غير صالحة';
          break;
        case 500:
          errorMessage = 'خطأ داخلي في الخادم';
          break;
        case 503:
          errorMessage = 'الخدمة غير متاحة حالياً';
          break;
        default:
          errorMessage = error.error?.message || `خطأ غير معروف: ${error.status}`;
      }
    }

    // تسجيل الخطأ في وضع التطوير
    if (!environment.production) {
      console.error('HTTP Error:', error);
    }

    return throwError(() => ({
      ...error,
      userMessage: errorMessage
    }));
  }

  /**
   * معالجة خطأ عدم التصريح
   */
  private handleUnauthorized(): void {
    // تسجيل خروج المستخدم
    this.authService.logout();
    
    // إعادة توجيه إلى صفحة تسجيل الدخول
    this.router.navigate(['/login'], {
      queryParams: { 
        message: 'انتهت جلسة العمل، يرجى تسجيل الدخول مرة أخرى' 
      }
    });
  }
}

// استيراد environment
import { environment } from '../../environments/environment';


