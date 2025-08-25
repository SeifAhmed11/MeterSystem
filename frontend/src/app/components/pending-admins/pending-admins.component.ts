import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

interface PendingAdmin {
  userName: string;
  email: string;
  emailConfirmed: boolean;
}

@Component({
  selector: 'app-pending-admins',
  template: `
    <div class="pending-admins-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <i class="fas fa-user-clock"></i>
          <div>
            <h1 class="page-title">المشرفين المعلقين</h1>
            <p class="page-description">قائمة بالمشرفين الذين لم يتم تفعيل حساباتهم بعد</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="refreshPendingAdmins()" [disabled]="isLoading">
            <i class="fas fa-sync-alt" [class.fa-spin]="isLoading"></i>
            تحديث
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>جاري تحميل البيانات...</p>
      </div>

      <!-- Content -->
      <div class="content" *ngIf="!isLoading">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon pending">
              <i class="fas fa-user-clock"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-number">{{ pendingAdmins.length }}</h3>
              <p class="stat-label">مشرف معلق</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon confirmed">
              <i class="fas fa-user-check"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-number">{{ confirmedCount }}</h3>
              <p class="stat-label">مشرف مفعل</p>
            </div>
          </div>
        </div>

        <!-- Pending Admins List -->
        <div class="pending-admins-section">
          <div class="section-header">
            <h2>قائمة المشرفين المعلقين</h2>
            <div class="section-actions">
              <button 
                class="btn btn-success btn-sm"
                (click)="confirmAllAdmins()"
                [disabled]="pendingAdmins.length === 0 || isConfirmingAll"
              >
                <i class="fas fa-check-double" *ngIf="!isConfirmingAll"></i>
                <div class="spinner" *ngIf="isConfirmingAll"></div>
                تفعيل الكل
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="pendingAdmins.length === 0">
            <div class="empty-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>لا يوجد مشرفين معلقين</h3>
            <p>جميع المشرفين تم تفعيل حساباتهم بنجاح</p>
          </div>

          <!-- Admins List -->
          <div class="admins-list" *ngIf="pendingAdmins.length > 0">
            <div class="admin-item" *ngFor="let admin of pendingAdmins; trackBy: trackByEmail">
              <div class="admin-info">
                <div class="admin-avatar">
                  <i class="fas fa-user"></i>
                </div>
                <div class="admin-details">
                  <h4 class="admin-name">{{ admin.userName }}</h4>
                  <p class="admin-email">{{ admin.email }}</p>
                  <span class="admin-status pending">
                    <i class="fas fa-clock"></i>
                    في انتظار التفعيل
                  </span>
                </div>
              </div>
              
              <div class="admin-actions">
                <button 
                  class="btn btn-success btn-sm"
                  (click)="confirmAdmin(admin)"
                  [disabled]="admin.isConfirming"
                >
                  <i class="fas fa-check" *ngIf="!admin.isConfirming"></i>
                  <div class="spinner" *ngIf="admin.isConfirming"></div>
                  تفعيل
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pending-admins-container { padding: 16px; max-width: 1200px; margin: 0 auto; }

    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 12px 16px; background: #fff; border-radius: 12px; color: var(--text-primary); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); gap: 8px; flex-wrap: wrap; }

    .header-content { display: flex; align-items: center; gap: 10px; }
    .header-content i { color: var(--primary-color); font-size: 20px; }
    .header-content .page-title { margin: 0; font-size: 18px; font-weight: 700; color: #000; }

    .page-description { margin: 2px 0 0; font-size: 0.9rem; color: var(--text-secondary); }

    .header-actions { display: flex; gap: 8px; }
    .btn-refresh { height: 34px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; font-weight: 600; cursor: pointer; transition: var(--transition); border: 1px solid var(--border-color); background: var(--primary-color); color: #fff; }
    .btn-refresh:hover { background: var(--primary-dark); }
    .btn-refresh:disabled { opacity: 0.7; cursor: not-allowed; }

    .loading-state {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--border-light);
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      margin: 12px 0 16px;
    }

    .stat-card {
      background: #fff;
      padding: 16px;
      border-radius: 10px;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stat-card:hover { box-shadow: var(--shadow-md); }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
    }

    .stat-icon.pending {
      background: var(--warning-color);
    }

    .stat-icon.confirmed {
      background: var(--success-color);
    }

    .stat-number {
      margin: 0 0 4px 0;
      font-size: 2rem;
      font-weight: 700;
      color: black;
    }

    .stat-label {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .pending-admins-section { background: #fff; border-radius: 12px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); overflow: hidden; }

    .section-header { padding: 12px 16px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }

    .section-header h2 { margin: 0; color: #000; font-size: 16px; }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-secondary);
    }

    .empty-icon {
      font-size: 4rem;
      color: var(--success-color);
      margin-bottom: 20px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: var(--text-primary);
    }

    .admins-list {
      padding: 0;
    }

    .admin-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color); }

    .admin-item:last-child {
      border-bottom: none;
    }

    .admin-item:hover {
      background: var(--bg-secondary);
    }

    .admin-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .admin-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
    }

    .admin-details h4 {
      margin: 0 0 4px 0;
      color: #000 !important;
      font-size: 1.1rem;
    }

    .admin-email {
      margin: 0 0 8px 0;
      color: #000 !important;
      font-size: 0.9rem;
      direction: ltr;
    }

    .admin-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--border-radius);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .admin-status.pending {
      background: var(--warning-color);
      color: white;
    }

    .admin-actions .btn {
      min-width: 100px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      border-radius: var(--border-radius);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      text-decoration: none;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--primary-dark);
    }

    .btn-success {
      background: var(--success-color);
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      background: var(--success-dark);
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .pending-admins-container {
        padding: 16px;
      }

      .page-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }

      .header-content h1 {
        font-size: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .admin-item {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .admin-actions {
        width: 100%;
      }

      .admin-actions .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class PendingAdminsComponent implements OnInit {
  pendingAdmins: (PendingAdmin & { isConfirming?: boolean })[] = [];
  isLoading = false;
  isConfirmingAll = false;
  confirmedCount = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('PendingAdminsComponent - ngOnInit called');
    console.log('PendingAdminsComponent - Current user:', this.authService.getCurrentUser());
    console.log('PendingAdminsComponent - User roles:', this.authService.getCurrentUser()?.roles);
    this.loadPendingAdmins();
  }

  loadPendingAdmins(): void {
    this.isLoading = true;
    const token = this.authService.getToken();

    if (!token) {
      console.error('No authentication token found');
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'en'
    });

    this.http.get<PendingAdmin[]>(`${environment.apiUrl}/User/pending-admins`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Pending admins loaded:', response);
          this.pendingAdmins = response.map(admin => ({
            ...admin,
            isConfirming: false
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading pending admins:', error);
          this.isLoading = false;
        }
      });
  }

  refreshPendingAdmins(): void {
    this.loadPendingAdmins();
  }

  confirmAdmin(admin: PendingAdmin & { isConfirming?: boolean }): void {
    admin.isConfirming = true;
    const token = this.authService.getToken();

    if (!token) {
      console.error('No authentication token found');
      admin.isConfirming = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'en',
      'Content-Type': 'application/json'
    });

    const body = { email: admin.email };

    this.http.post(`${environment.apiUrl}/User/confirm-admin-email`, body, { headers })
      .subscribe({
        next: (response) => {
          console.log('Admin confirmed successfully:', response);
          // Remove the confirmed admin from the list
          this.pendingAdmins = this.pendingAdmins.filter(a => a.email !== admin.email);
          this.confirmedCount++;
        },
        error: (error) => {
          console.error('Error confirming admin:', error);
          admin.isConfirming = false;
        }
      });
  }

  confirmAllAdmins(): void {
    if (this.pendingAdmins.length === 0) return;

    this.isConfirmingAll = true;
    const token = this.authService.getToken();

    if (!token) {
      console.error('No authentication token found');
      this.isConfirmingAll = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'en',
      'Content-Type': 'application/json'
    });

    // Confirm all admins sequentially
    let confirmedCount = 0;
    const totalAdmins = this.pendingAdmins.length;

    const confirmNext = (index: number) => {
      if (index >= totalAdmins) {
        this.isConfirmingAll = false;
        this.loadPendingAdmins(); // Refresh the list
        return;
      }

      const admin = this.pendingAdmins[index];
      const body = { email: admin.email };

      this.http.post(`${environment.apiUrl}/User/confirm-admin-email`, body, { headers })
        .subscribe({
          next: (response) => {
            console.log(`Admin ${admin.email} confirmed successfully`);
            confirmedCount++;
            confirmNext(index + 1);
          },
          error: (error) => {
            console.error(`Error confirming admin ${admin.email}:`, error);
            confirmNext(index + 1);
          }
        });
    };

    confirmNext(0);
  }

  trackByEmail(index: number, admin: PendingAdmin): string {
    return admin.email;
  }
}
