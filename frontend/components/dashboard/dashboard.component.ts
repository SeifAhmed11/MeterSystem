import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="welcome-content">
          <h1 class="welcome-title">مرحباً بك في نظام إدارة العدادات</h1>
          <p class="welcome-subtitle">نظرة عامة على النظام والإحصائيات المهمة</p>
        </div>
        <div class="welcome-actions">
          <button class="btn btn-primary">
            <i class="fas fa-plus"></i>
            إضافة عميل جديد
          </button>
          <button class="btn btn-secondary">
            <i class="fas fa-chart-bar"></i>
            عرض التقارير
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card card-stats">
          <div class="card-icon" style="background: var(--gradient-primary);">
            <i class="fas fa-users"></i>
          </div>
          <div class="card-value">{{ stats.customers }}</div>
          <div class="card-label">إجمالي العملاء</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +12% هذا الشهر
          </div>
        </div>

        <div class="stat-card card-stats">
          <div class="card-icon" style="background: var(--gradient-secondary);">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="card-value">{{ stats.meters }}</div>
          <div class="card-label">العدادات النشطة</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +8% هذا الشهر
          </div>
        </div>

        <div class="stat-card card-stats">
          <div class="card-icon" style="background: var(--gradient-accent);">
            <i class="fas fa-file-contract"></i>
          </div>
          <div class="card-value">{{ stats.contracts }}</div>
          <div class="card-label">العقود النشطة</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +15% هذا الشهر
          </div>
        </div>

        <div class="stat-card card-stats">
          <div class="card-icon" style="background: var(--gradient-success);">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="card-value">{{ stats.revenue | currency:'SAR ' }}</div>
          <div class="card-label">الإيرادات الشهرية</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +22% هذا الشهر
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-card">
          <div class="chart-header">
            <h3>استهلاك الطاقة الشهري</h3>
            <div class="chart-actions">
              <button class="btn btn-sm btn-outline">عرض التفاصيل</button>
            </div>
          </div>
          <div class="chart-container">
            <div class="chart-placeholder">
              <i class="fas fa-chart-line"></i>
              <p>رسم بياني لاستهلاك الطاقة</p>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>إعادة الشحن الشهرية</h3>
            <div class="chart-actions">
              <button class="btn btn-sm btn-outline">عرض التفاصيل</button>
            </div>
          </div>
          <div class="chart-container">
            <div class="chart-placeholder">
              <i class="fas fa-chart-pie"></i>
              <p>رسم بياني لإعادة الشحن</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="recent-activities">
        <div class="section-header">
          <h3>النشاطات الأخيرة</h3>
          <button class="btn btn-sm btn-outline">عرض الكل</button>
        </div>
        
        <div class="activities-list">
          <div class="activity-item" *ngFor="let activity of recentActivities">
            <div class="activity-icon" [ngClass]="activity.type">
              <i [class]="getActivityIcon(activity.type)"></i>
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-description">{{ activity.description }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
            <div class="activity-status" [ngClass]="activity.status">
              {{ activity.status }}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <div class="section-header">
          <h3>إجراءات سريعة</h3>
        </div>
        
        <div class="actions-grid">
          <button class="action-card" (click)="navigateTo('customers')">
            <div class="action-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="action-title">إضافة عميل</div>
            <div class="action-description">إضافة عميل جديد للنظام</div>
          </button>

          <button class="action-card" (click)="navigateTo('meters')">
            <div class="action-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <div class="action-title">إضافة عداد</div>
            <div class="action-description">تسجيل عداد جديد</div>
          </button>

          <button class="action-card" (click)="navigateTo('contracts')">
            <div class="action-icon">
              <i class="fas fa-file-contract"></i>
            </div>
            <div class="action-title">إنشاء عقد</div>
            <div class="action-description">إنشاء عقد جديد</div>
          </button>

          <button class="action-card" (click)="navigateTo('recharges')">
            <div class="action-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="action-title">إعادة شحن</div>
            <div class="action-description">إعادة شحن عداد</div>
          </button>

          <button class="action-card" (click)="navigateTo('consumptions')">
            <div class="action-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            <div class="action-title">قراءة عداد</div>
            <div class="action-description">تسجيل قراءة جديدة</div>
          </button>

          <button class="action-card" (click)="navigateTo('reports')">
            <div class="action-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <div class="action-title">التقارير</div>
            <div class="action-description">عرض التقارير</div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Welcome Section */
    .welcome-section {
      background: var(--gradient-primary);
      border-radius: var(--border-radius-lg);
      padding: 3rem;
      margin-bottom: 2rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-lg);
    }

    .welcome-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
    }

    .welcome-subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      color: white;
    }

    .welcome-actions {
      display: flex;
      gap: 1rem;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      text-align: center;
      padding: 2rem;
      transition: var(--transition);
    }

    .stat-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }

    .card-icon {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 1.75rem;
      color: white;
    }

    .card-value {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .card-label {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .stat-change {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .stat-change.positive {
      color: var(--success-color);
    }

    .stat-change.negative {
      color: var(--error-color);
    }

    /* Charts Section */
    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .chart-header h3 {
      margin: 0;
      color: var(--text-primary);
    }

    .chart-container {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .chart-placeholder {
      text-align: center;
      color: var(--text-muted);
    }

    .chart-placeholder i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    /* Recent Activities */
    .recent-activities {
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-md);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h3 {
      margin: 0;
      color: var(--text-primary);
    }

    .activities-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    .activity-item:hover {
      background: var(--bg-tertiary);
    }

    .activity-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: white;
    }

    .activity-icon.customer { background: var(--gradient-primary); }
    .activity-icon.meter { background: var(--gradient-secondary); }
    .activity-icon.contract { background: var(--gradient-accent); }
    .activity-icon.recharge { background: var(--gradient-success); }
    .activity-icon.consumption { background: var(--gradient-warning); }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .activity-description {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .activity-time {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    .activity-status {
      padding: 0.25rem 0.75rem;
      border-radius: var(--border-radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .activity-status.completed {
      background: rgba(34, 197, 94, 0.1);
      color: var(--success-color);
    }

    .activity-status.pending {
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning-color);
    }

    .activity-status.failed {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error-color);
    }

    /* Quick Actions */
    .quick-actions {
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-card {
      background: var(--bg-secondary);
      border: none;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .action-card:hover {
      background: var(--bg-tertiary);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .action-icon {
      width: 60px;
      height: 60px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .action-title {
      font-weight: 600;
      color: var(--text-primary);
    }

    .action-description {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.4;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .welcome-section {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        padding: 2rem;
      }

      .welcome-title {
        font-size: 2rem;
      }

      .welcome-actions {
        flex-direction: column;
        width: 100%;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .charts-section {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    customers: 1250,
    meters: 1890,
    contracts: 1150,
    revenue: 45000
  };

  recentActivities = [
    {
      type: 'customer',
      title: 'تم إضافة عميل جديد',
      description: 'أحمد محمد علي - الرياض',
      time: 'منذ 5 دقائق',
      status: 'completed'
    },
    {
      type: 'meter',
      title: 'تم تثبيت عداد جديد',
      description: 'عداد كهربائي - MTR-001',
      time: 'منذ 15 دقيقة',
      status: 'completed'
    },
    {
      type: 'contract',
      title: 'تم إنشاء عقد جديد',
      description: 'عقد رقم #CTR-2024-001',
      time: 'منذ ساعة',
      status: 'pending'
    },
    {
      type: 'recharge',
      title: 'تم إعادة شحن عداد',
      description: 'مبلغ 100 ريال - عداد #MTR-001',
      time: 'منذ ساعتين',
      status: 'completed'
    },
    {
      type: 'consumption',
      title: 'تم تسجيل قراءة جديدة',
      description: 'قراءة عداد #MTR-001 - 150 كيلوواط',
      time: 'منذ 3 ساعات',
      status: 'completed'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      customer: 'fas fa-user-plus',
      meter: 'fas fa-bolt',
      contract: 'fas fa-file-contract',
      recharge: 'fas fa-credit-card',
      consumption: 'fas fa-tachometer-alt'
    };
    return icons[type] || 'fas fa-info-circle';
  }

  navigateTo(route: string): void {
    // Navigate to specific route
    console.log(`Navigating to: ${route}`);
  }
}





