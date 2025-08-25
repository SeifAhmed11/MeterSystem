import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <div class="register-card">
        <!-- Logo and Title -->
        <div class="register-header">
          <div class="logo-container">
            <img src="../../../assets/images/Elsewedy-EMG-logo.png" alt="Elsewedy EMG" class="elsewedy-logo-large"/>
            <h1 class="logo-title">إنشاء حساب جديد</h1>
            <p class="logo-subtitle">انضم إلى نظام إدارة العدادات</p>
          </div>
        </div>

        <!-- Register Form -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-row">
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
                <span *ngIf="registerForm.get('email')?.errors?.['required']">
                  البريد الإلكتروني مطلوب
                </span>
                <span *ngIf="registerForm.get('email')?.errors?.['email']">
                  بريد إلكتروني غير صحيح
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="nationalId">
                <i class="fas fa-id-card"></i>
                الرقم القومي
              </label>
              <input
                type="text"
                id="nationalId"
                formControlName="nationalId"
                placeholder="أدخل الرقم القومي"
                [class.error]="isFieldInvalid('nationalId')"
                class="form-input"
              />
              <div *ngIf="isFieldInvalid('nationalId')" class="form-error">
                <span *ngIf="registerForm.get('nationalId')?.errors?.['required']">
                  الرقم القومي مطلوب
                </span>
                <span *ngIf="registerForm.get('nationalId')?.errors?.['minlength']">
                  الرقم القومي يجب أن يكون 10 أرقام على الأقل
                </span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="name">
              <i class="fas fa-user"></i>
              الاسم الكامل (اختياري)
            </label>
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder="أدخل اسمك الكامل"
              class="form-input"
            />
          </div>

          <div class="form-row">
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
                >
                  <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div *ngIf="isFieldInvalid('password')" class="form-error">
                <span *ngIf="registerForm.get('password')?.errors?.['required']">
                  كلمة المرور مطلوبة
                </span>
                <span *ngIf="registerForm.get('password')?.errors?.['minlength']">
                  كلمة المرور يجب أن تكون 6 أحرف على الأقل
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">
                <i class="fas fa-lock"></i>
                تأكيد كلمة المرور
              </label>
              <div class="password-input-container">
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور"
                  [class.error]="isFieldInvalid('confirmPassword')"
                  class="form-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  (click)="toggleConfirmPassword()"
                >
                  <i [class]="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div *ngIf="isFieldInvalid('confirmPassword')" class="form-error">
                <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                  تأكيد كلمة المرور مطلوب
                </span>
                <span *ngIf="registerForm.get('confirmPassword')?.errors?.['mismatch']">
                  كلمات المرور غير متطابقة
                </span>
              </div>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="agreeToTerms" />
              <span class="checkmark"></span>
              أوافق على 
              <a href="#" class="terms-link">الشروط والأحكام</a>
            </label>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || loading" class="register-btn">
            <span *ngIf="!loading">إنشاء الحساب</span>
            <div *ngIf="loading" class="loading-spinner"></div>
          </button>
        </form>

        <div class="login-link">
          <p>لديك حساب بالفعل؟</p>
          <a routerLink="/login" class="login-link-btn">تسجيل الدخول</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--bg-secondary);
      position: relative;
      overflow: hidden;
      padding: 2rem;
    }

    .register-card {
      background: #fff;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      padding: 24px;
      width: 100%;
      max-width: 560px;
      position: relative;
      z-index: 2;
    }

    .register-header {
      text-align: center;
      margin-bottom: 1.25rem;
    }

    .logo-container {
      margin-bottom: 0.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .elsewedy-logo-large { height: 56px; width: auto; }

    .logo-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .logo-subtitle {
      color: var(--text-secondary);
      font-size: 14px;
    }

    .register-form {
      margin-bottom: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #000;
    }

    .form-group label i {
      color: var(--secondary-color);
    }

    .form-input { width: 100%; padding: 10px 12px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 0.95rem; font-family: inherit; transition: var(--transition); background: white; }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(227, 30, 38, 0.08);
    }

    .form-input.error {
      border-color: var(--error-color);
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.08);
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

    .password-toggle:hover { color: var(--primary-color); }

    .form-error { color: var(--error-color); font-size: 0.8rem; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.25rem; }

    .form-options { margin-bottom: 1rem; }

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

    .checkmark { width: 16px; height: 16px; border: 1.5px solid var(--border-color); border-radius: 4px; position: relative; transition: var(--transition); flex-shrink: 0; }

    .checkbox-container input[type="checkbox"]:checked + .checkmark { background: var(--primary-color); border-color: var(--primary-color); }

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

    .terms-link { color: var(--primary-color); text-decoration: none; transition: var(--transition); }

    .terms-link:hover {
      text-decoration: underline;
    }

    .register-btn { width: 100%; height: 44px; font-size: 0.95rem; font-weight: 600; border: none; border-radius: 8px; background: var(--primary-color); color: #fff; cursor: pointer; transition: var(--transition); margin: 4px 0 12px; }
    .register-btn:hover { background: var(--primary-dark); }
    .register-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .login-link { text-align: center; margin-top: 4px; }
    .login-link p { margin: 0 0 8px; color: var(--text-secondary); font-size: 0.9rem; }
    .login-link-btn { display: inline-block; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color); color: var(--text-primary); text-decoration: none; }
    .login-link-btn:hover { border-color: var(--primary-color); color: var(--primary-color); }

    .login-link {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-link p {
      margin-bottom: 1rem;
      color: var(--text-secondary);
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
      .register-container { padding: 1rem; }
      .register-card { padding: 20px; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nationalId: ['', [Validators.required, Validators.minLength(10)]],
      name: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password, nationalId, name } = this.registerForm.value;

      this.authService.register(email, password, nationalId).subscribe({
        next: (response) => {
          if (response.success) {
            // إعادة توجيه إلى صفحة تسجيل الدخول مع رسالة نجاح
            this.router.navigate(['/login'], {
              queryParams: { 
                message: 'تم إنشاء الحساب بنجاح، يرجى تسجيل الدخول' 
              }
            });
          }
        },
        error: (error) => {
          console.error('Register error:', error);
          // Handle error (show toast, etc.)
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private passwordMatchValidator(form: any) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }
}





