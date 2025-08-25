import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-enhanced',
  template: `
    <div class="dashboard-container">
      <div class="brand-bar card-simple">
        <div class="brand-left">
          <img src="../../../assets/images/Elsewedy-EMG-logo.png" alt="Elsewedy EMG" class="logo"/>
          <div class="brand-text">
            <h2>لوحة التحكم</h2>
            <p>عرض مختصر لأهم المؤشرات</p>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-title">العملاء</div>
          <div class="stat-value">{{ stats.customers || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">العدادات</div>
          <div class="stat-value">{{ stats.meters || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">العقود</div>
          <div class="stat-value">{{ stats.contracts || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">الشحنات</div>
          <div class="stat-value">{{ stats.recharges || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">الاستهلاك</div>
          <div class="stat-value">{{ stats.consumptions || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">المستخدمين</div>
          <div class="stat-value">{{ stats.users || '—' }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-title">المشرفين المعلقين</div>
          <div class="stat-value">{{ stats.pendingAdmins || '0' }}</div>
        </div>
      </div>

      <div class="quick-actions card-simple">
        <div class="actions-grid">
          <button class="btn-primary-min" routerLink="/dashboard">لوحة التحكم</button>
          <button class="btn-primary-min" routerLink="/customers">العملاء</button>
          <button class="btn-primary-min" routerLink="/meters">العدادات</button>
          <button class="btn-primary-min" routerLink="/contracts">العقود</button>
          <button class="btn-primary-min" routerLink="/recharges">الشحنات</button>
          <button class="btn-outline-min" routerLink="/pending-admins">المشرفين المعلقين</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 1100px; margin: 0 auto; padding: 16px; background: var(--bg-secondary); min-height: 100vh; }

    .card-simple { background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; box-shadow: var(--shadow-sm); margin-bottom: 12px; }

    .brand-bar { display: flex; align-items: center; }
    .brand-left { display: flex; align-items: center; gap: 12px; }
    .brand-left .logo { height: 36px; width: auto; }
    .brand-text h2 { margin: 0 0 4px; font-size: 20px; color: #000; }
    .brand-text p { margin: 0; color: var(--text-secondary); font-size: 0.95rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 12px 0 16px; }
    .stat-box { background: #fff; border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; box-shadow: var(--shadow-sm); }
    .stat-title { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 6px; }
    .stat-value { color: #000; font-size: 1.4rem; font-weight: 700; }

    .quick-actions .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
    .btn-primary-min { height: 40px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--primary-color); color: #fff; font-weight: 600; cursor: pointer; transition: var(--transition); }
    .btn-primary-min:hover { background: var(--primary-dark); }
    .btn-outline-min { height: 40px; border-radius: 8px; border: 1px solid var(--border-color); background: #fff; color: var(--text-primary); font-weight: 600; cursor: pointer; transition: var(--transition); }
    .btn-outline-min:hover { border-color: var(--primary-color); color: var(--primary-color); }

    @media (max-width: 768px) {
      .dashboard-container { padding: 12px; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class DashboardEnhancedComponent implements OnInit {
  stats: DashboardStats = {
    customers: 0,
    meters: 0,
    contracts: 0,
    recharges: 0,
    consumptions: 0,
    users: 0,
    pendingAdmins: 0
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
  }
}
