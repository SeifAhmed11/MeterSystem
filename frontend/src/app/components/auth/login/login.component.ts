import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <i class="fas fa-bolt"></i>
            <h1>نظام العدادات</h1>
          </div>
          <p class="subtitle">مرحباً بك مرة أخرى</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>البريد الإلكتروني</mat-label>
            <input matInput type="email" formControlName="email" placeholder="أدخل بريدك الإلكتروني">
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              البريد الإلكتروني مطلوب
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              يرجى إدخال بريد إلكتروني صحيح
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>كلمة المرور</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="أدخل كلمة المرور">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              كلمة المرور مطلوبة
            </mat-error>
          </mat-form-field>

          <div class="form-options">
            <mat-checkbox formControlName="rememberMe">تذكرني</mat-checkbox>
            <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
          </div>

          <button mat-raised-button color="primary" type="submit" class="login-button full-width" [disabled]="loginForm.invalid || isLoading">
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
            <span *ngIf="!isLoading">تسجيل الدخول</span>
          </button>

          <div class="register-link">
            <span>ليس لديك حساب؟</span>
            <a [routerLink]="['/register']">إنشاء حساب جديد</a>
          </div>
        </form>
      </div>

      <!-- Background shapes -->
      <div class="background-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-gradient));
      position: relative;
      overflow: hidden;
    }

    .login-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: var(--shadow-xl);
      width: 100%;
      max-width: 450px;
      z-index: 2;
      position: relative;
    }

    .login-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .logo i {
      font-size: 32px;
      color: var(--primary-color);
    }

    .logo h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 16px;
      margin: 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .full-width {
      width: 100%;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }

    .forgot-password {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 14px;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .login-button {
      height: 50px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 12px;
      margin-top: 10px;
    }

    .register-link {
      text-align: center;
      margin-top: 24px;
      color: var(--text-secondary);
    }

    .register-link a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      margin-right: 8px;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .background-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 10%;
      animation-delay: 2s;
    }

    .shape-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @media (max-width: 480px) {
      .login-card {
        margin: 20px;
        padding: 30px 20px;
      }
      
      .form-options {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

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

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const { email, password, rememberMe } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
}
