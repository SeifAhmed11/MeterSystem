import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  password: string;
  email: string;
  nationalId: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  roles: string[];
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
  success: boolean;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // تحقق من وجود مستخدم محفوظ عند بدء التطبيق
    this.loadUserFromStorage();
  }

  /**
   * تسجيل دخول المستخدم
   */
  login(email: string, password: string): Observable<AuthResponse> {
    const loginData: LoginRequest = { email, password };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/login`, loginData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setCurrentUser(response.data.token, response.data.user);
          }
        })
      );
  }

  /**
   * تسجيل مستخدم جديد
   */
  register(email: string, password: string, nationalId: string): Observable<BaseResponse<string>> {
    const registerData: RegisterRequest = { 
      userName: email, // استخدام البريد الإلكتروني كاسم المستخدم
      email, 
      password, 
      nationalId 
    };
    
    return this.http.post<BaseResponse<string>>(`${this.apiUrl}/user/register`, registerData);
  }

  /**
   * تسجيل خروج المستخدم
   */
  logout(): void {
    // إزالة البيانات من التخزين المحلي
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // تحديث حالة المستخدم الحالي
    this.currentUserSubject.next(null);
    
    // إعادة توجيه إلى صفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }

  /**
   * الحصول على المستخدم الحالي
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * التحقق من تسجيل دخول المستخدم
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * التحقق من المصادقة (alias for isLoggedIn)
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  /**
   * الحصول على الرمز المميز
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * التحقق من صلاحية الرمز المميز
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * التحقق من صلاحيات المستخدم
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes(role) || false;
  }

  /**
   * التحقق من صلاحيات متعددة
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return roles.some(role => user.roles.includes(role));
  }

  /**
   * تحديث معلومات المستخدم
   */
  updateUserInfo(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * تجديد الرمز المميز
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/refresh-token`, {})
      .pipe(
        tap(response => {
          if (response.success) {
            this.setCurrentUser(response.data.token, response.data.user);
          }
        })
      );
  }

  /**
   * تحميل بيانات المستخدم من التخزين المحلي
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr && !this.isTokenExpired(token)) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  /**
   * تعيين المستخدم الحالي
   */
  private setCurrentUser(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
