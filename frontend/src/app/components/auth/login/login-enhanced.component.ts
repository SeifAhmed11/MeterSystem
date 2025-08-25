import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-enhanced',
  template: `
    <div class="login-container">
      <div class="login-content">
        <div class="login-card">
          <div class="login-header">
            <div class="logo-container">
              <img src="../../../assets/images/Elsewedy-EMG-logo.png" alt="Elsewedy EMG" class="elsewedy-logo-large"/>
              <h1 class="logo-title">نظام العدادات</h1>
            </div>
            <p class="login-subtitle">تسجيل الدخول إلى لوحة التحكم</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">
                <i class="fas fa-envelope"></i>
                البريد الإلكتروني
              </label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="email"
                  formControlName="email"
                  class="form-input"
                  placeholder="أدخل البريد الإلكتروني"
                  [ngClass]="{'error': loginForm.get('email')?.invalid && loginForm.get('email')?.touched}"
                >
                <div class="input-icon"><i class="fas fa-envelope"></i></div>
              </div>
              <div class="form-error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                <span *ngIf="loginForm.get('email')?.hasError('required')">البريد الإلكتروني مطلوب</span>
                <span *ngIf="loginForm.get('email')?.hasError('email')">البريد الإلكتروني غير صحيح</span>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">
                <i class="fas fa-lock"></i>
                كلمة المرور
              </label>
              <div class="input-wrapper">
                <input 
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  formControlName="password"
                  class="form-input"
                  placeholder="أدخل كلمة المرور"
                  [ngClass]="{'error': loginForm.get('password')?.invalid && loginForm.get('password')?.touched}"
                >
                <div class="input-icon"><i class="fas fa-lock"></i></div>
                <button 
                  type="button" 
                  class="password-toggle"
                  (click)="togglePassword()"
                >
                  <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div class="form-error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                كلمة المرور مطلوبة
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-wrapper">
                <input type="checkbox" formControlName="rememberMe">
                <span class="checkmark"></span>
                تذكرني
              </label>
              <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
            </div>

            <button type="submit" class="login-btn" [disabled]="loginForm.invalid || isLoading">
              <span *ngIf="!isLoading">تسجيل الدخول</span>
              <div class="spinner" *ngIf="isLoading"></div>
            </button>
          </form>

          <div class="login-footer">
            <p class="footer-text">
              ليس لديك حساب؟ 
              <a routerLink="/register" class="register-link">إنشاء حساب جديد</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .login-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .floating-shapes { display: none; }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 80px;
      height: 80px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 120px;
      height: 120px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    .shape-3 {
      width: 60px;
      height: 60px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }

    .shape-4 {
      width: 100px;
      height: 100px;
      top: 30%;
      right: 30%;
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    .login-content { display: flex; align-items: center; justify-content: center; max-width: 420px; width: 100%; z-index: 2; position: relative; }

    .login-card { background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; box-shadow: var(--shadow-sm); width: 100%; }

    .login-header {
      text-align: center;
      margin-bottom: 1.25rem;
    }

    .logo-container {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-title { font-size: 20px; font-weight: 700; margin: 0; color: var(--text-primary); }

    .login-subtitle { font-size: 14px; color: var(--text-secondary); margin: 0; }

    .login-form { margin-bottom: 1rem; }

    .form-group { margin-bottom: 1rem; }

    .form-label { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #000; font-size: 0.95rem; }

    .form-label i {
      color: var(--primary-color);
    }

    .input-wrapper {
      position: relative;
    }

    .form-input { width: 100%; padding: 10px 40px 10px 36px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem; font-family: inherit; transition: var(--transition); background: var(--bg-primary); direction: rtl; }

    .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(227, 30, 38, 0.08); }

    .form-input.error { border-color: var(--error-color); box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.08); }

    .form-input:hover {
      border-color: var(--primary-light);
      transform: translateY(-1px);
    }

    .input-icon {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1.1rem;
    }

    .password-toggle {
      position: absolute;
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
    }

    .password-toggle:hover { color: var(--primary-color); background: var(--bg-secondary); }

    .form-error { color: var(--error-color); font-size: 0.8rem; margin-top: 0.35rem; font-weight: 500; }

    .form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }

    .checkbox-wrapper { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.85rem; color: var(--text-secondary); }

    .checkbox-wrapper input[type="checkbox"] {
      display: none;
    }

    .checkmark { width: 16px; height: 16px; border: 1.5px solid var(--border-color); border-radius: 4px; position: relative; transition: var(--transition); }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkmark { background: var(--primary-color); border-color: var(--primary-color); }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .forgot-password { color: var(--primary-color); text-decoration: none; font-size: 0.85rem; transition: var(--transition); }

    .forgot-password:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    .login-btn { width: 100%; height: 44px; font-size: 0.95rem; font-weight: 600; border: none; border-radius: 8px; background: var(--primary-color); color: #fff; cursor: pointer; transition: var(--transition); }
    .login-btn:hover { background: var(--primary-dark); }
    .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .login-footer { text-align: center; padding-top: 1rem; border-top: 1px solid var(--border-light); }

    .footer-text { margin: 0; color: var(--text-secondary); font-size: 0.85rem; }

    .register-link { color: var(--primary-color); text-decoration: none; font-weight: 600; transition: var(--transition); }

    .register-link:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    /* Features Section */
    .features-section { display: none; }

    .feature-card {
      padding: 2rem;
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: var(--transition);
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      color: white;
    }

    .feature-card h3 {
      margin: 0 0 1rem 0;
      color: var(--text-primary);
      font-size: 1.25rem;
    }

    .feature-card p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .login-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .features-section {
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .feature-card {
        flex: 1;
        min-width: 250px;
      }
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }
      
      .login-card {
        padding: 2rem;
      }
      
      .logo-title {
        font-size: 2rem;
      }
      
      .features-section {
        flex-direction: column;
      }
      
      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }

    /* Glass Effect */
    .card-glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Gradient Text */
    .elsewedy-logo-large { height: 60px; width: auto; }

    /* Enhanced Spinner */
    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoginEnhancedComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const { email, password, rememberMe } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed:', error);
          // يمكن إضافة رسالة خطأ للمستخدم هنا
        }
      });
    }
  }
}
