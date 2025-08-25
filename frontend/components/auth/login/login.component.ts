import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <!-- Logo and Title -->
        <div class="login-header">
          <div class="logo-container">
            <div class="logo-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h1 class="logo-title">نظام إدارة العدادات</h1>
            <p class="logo-subtitle">Meter System Management</p>
          </div>
        </div>

        <!-- Login Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="أدخل بريدك الإلكتروني"
              [class.error]="isFieldInvalid('email')"
              class="form-input"
            />
            <div *ngIf="isFieldInvalid('email')" class="form-error">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">
                البريد الإلكتروني مطلوب
              </span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">
                بريد إلكتروني غير صحيح
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              كلمة المرور
            </label>
            <div class="password-input-container">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                placeholder="أدخل كلمة المرور"
                [class.error]="isFieldInvalid('password')"
                class="form-input"
              />
              <button
                type="button"
                class="password-toggle"
                (click)="togglePassword()"
                [attr.aria-label]="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
              >
                <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div *ngIf="isFieldInvalid('password')" class="form-error">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">
                كلمة المرور مطلوبة
              </span>
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                كلمة المرور يجب أن تكون 6 أحرف على الأقل
              </span>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="rememberMe" />
              <span class="checkmark"></span>
              تذكرني
            </label>
            <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
          </div>

          <button
            type="submit"
            [disabled]="loginForm.invalid || loading"
            class="btn btn-primary btn-login"
          >
            <span *ngIf="!loading">تسجيل الدخول</span>
            <div *ngIf="loading" class="loading-spinner"></div>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span>أو</span>
        </div>

        <!-- Register Link -->
        <div class="register-link">
          <p>ليس لديك حساب؟</p>
          <a routerLink="/register" class="btn btn-outline">إنشاء حساب جديد</a>
        </div>

        <!-- Features -->
        <div class="features">
          <div class="feature-item">
            <i class="fas fa-shield-alt"></i>
            <span>أمان عالي</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-chart-line"></i>
            <span>تقارير مفصلة</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-mobile-alt"></i>
            <span>متوافق مع الجوال</span>
          </div>
        </div>
      </div>

      <!-- Background Elements -->
      <div class="background-elements">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--gradient-primary);
      position: relative;
      overflow: hidden;
      padding: 2rem;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-xl);
      padding: 3rem;
      width: 100%;
      max-width: 450px;
      position: relative;
      z-index: 10;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo-container {
      margin-bottom: 1rem;
    }

    .logo-icon {
      width: 80px;
      height: 80px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      box-shadow: var(--shadow-lg);
    }

    .logo-icon i {
      font-size: 2rem;
      color: white;
    }

    .logo-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .logo-subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .login-form {
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .form-group label i {
      color: var(--primary-color);
    }

    .form-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-family: inherit;
      transition: var(--transition);
      background: white;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .form-input.error {
      border-color: var(--error-color);
    }

    .password-input-container {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.5rem;
      transition: var(--transition);
    }

    .password-toggle:hover {
      color: var(--primary-color);
    }

    .form-error {
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .checkbox-container input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-color);
      border-radius: 4px;
      position: relative;
      transition: var(--transition);
    }

    .checkbox-container input[type="checkbox"]:checked + .checkmark {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }

    .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .forgot-password {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.875rem;
      transition: var(--transition);
    }

    .forgot-password:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    .btn-login {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .divider {
      text-align: center;
      margin: 2rem 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--border-color);
    }

    .divider span {
      background: white;
      padding: 0 1rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .register-link {
      text-align: center;
      margin-bottom: 2rem;
    }

    .register-link p {
      margin-bottom: 1rem;
      color: var(--text-secondary);
    }

    .features {
      display: flex;
      justify-content: space-around;
      gap: 1rem;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }

    .feature-item i {
      color: var(--primary-color);
      font-size: 1.25rem;
    }

    .feature-item span {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .background-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .floating-shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 100px;
      height: 100px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    .shape-3 {
      width: 80px;
      height: 80px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }

    .shape-4 {
      width: 120px;
      height: 120px;
      top: 30%;
      right: 30%;
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 2rem;
      }

      .features {
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            // Store token and user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Navigate to dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error (show toast, etc.)
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}





