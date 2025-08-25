import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <!-- Hero Welcome Section -->
      <div class="hero-section card card-gradient">
        <div class="hero-content">
          <h1 class="hero-title rainbow-text">مرحباً بك في نظام العدادات الذكي</h1>
          <p class="hero-subtitle">إدارة شاملة ومتقدمة لعدادات الكهرباء والمياه</p>
          <div class="hero-stats">
            <div class="hero-stat-item floating">
              <div class="stat-icon-wrapper">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">1,234</span>
                <span class="stat-label">عميل نشط</span>
              </div>
            </div>
            <div class="hero-stat-item floating" style="animation-delay: 0.2s;">
              <div class="stat-icon-wrapper">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">856</span>
                <span class="stat-label">عداد ذكي</span>
              </div>
            </div>
            <div class="hero-stat-item floating" style="animation-delay: 0.4s;">
              <div class="stat-icon-wrapper">
                <i class="fas fa-file-contract"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">642</span>
                <span class="stat-label">عقد نشط</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-icons">
            <i class="fas fa-bolt floating" style="animation-delay: 0s;"></i>
            <i class="fas fa-water floating" style="animation-delay: 0.3s;"></i>
            <i class="fas fa-chart-line floating" style="animation-delay: 0.6s;"></i>
          </div>
        </div>
      </div>

      <!-- Enhanced Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card card card-stats hover-lift" style="background: var(--gradient-ultra);">
          <div class="card-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="card-value">45,678</div>
          <div class="card-label">كيلو وات</div>
          <div class="stat-trend positive">
            <i class="fas fa-arrow-up"></i>
            <span>+12%</span>
          </div>
        </div>

        <div class="stat-card card card-stats hover-lift" style="background: var(--gradient-sunset);">
          <div class="card-icon">
            <i class="fas fa-credit-card"></i>
          </div>
          <div class="card-value">234,567</div>
          <div class="card-label">ريال</div>
          <div class="stat-trend positive">
            <i class="fas fa-arrow-up"></i>
            <span>+8%</span>
          </div>
        </div>

        <div class="stat-card card card-stats hover-lift" style="background: var(--gradient-fire);">
          <div class="card-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="card-value">12</div>
          <div class="card-label">عداد معطل</div>
          <div class="stat-trend negative">
            <i class="fas fa-exclamation-circle"></i>
            <span>تحتاج صيانة</span>
          </div>
        </div>

        <div class="stat-card card card-stats hover-lift" style="background: var(--gradient-ocean);">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="card-value">15.3%</div>
          <div class="card-label">معدل النمو</div>
          <div class="stat-trend positive">
            <i class="fas fa-arrow-up"></i>
            <span>نمو ممتاز</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Charts Section -->
      <div class="charts-section">
        <div class="chart-card card card-hover">
          <div class="chart-header">
            <h3 class="gradient-text">استهلاك الطاقة الشهري</h3>
            <div class="chart-controls">
              <button class="btn btn-outline btn-sm active">الشهر</button>
              <button class="btn btn-outline btn-sm">السنة</button>
            </div>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder glass">
              <div class="chart-icon">
                <i class="fas fa-chart-area"></i>
              </div>
              <p>سيتم إضافة الرسم البياني التفاعلي هنا</p>
              <div class="chart-preview">
                <div class="chart-bar" style="height: 60%; background: var(--gradient-primary);"></div>
                <div class="chart-bar" style="height: 80%; background: var(--gradient-secondary);"></div>
                <div class="chart-bar" style="height: 45%; background: var(--gradient-accent);"></div>
                <div class="chart-bar" style="height: 90%; background: var(--gradient-success);"></div>
                <div class="chart-bar" style="height: 70%; background: var(--gradient-warning);"></div>
                <div class="chart-bar" style="height: 85%; background: var(--gradient-error);"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card card card-hover">
          <div class="chart-header">
            <h3 class="gradient-text">توزيع أنواع العدادات</h3>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder glass">
              <div class="chart-icon">
                <i class="fas fa-chart-pie"></i>
              </div>
              <p>سيتم إضافة الرسم البياني الدائري هنا</p>
              <div class="pie-preview">
                <div class="pie-segment" style="--start: 0deg; --end: 120deg; background: var(--gradient-primary);"></div>
                <div class="pie-segment" style="--start: 120deg; --end: 240deg; background: var(--gradient-secondary);"></div>
                <div class="pie-segment" style="--start: 240deg; --end: 360deg; background: var(--gradient-accent);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Activities Section -->
      <div class="activities-section card card-hover">
        <div class="section-header">
          <h3 class="gradient-text">الأنشطة الحديثة</h3>
          <button class="btn btn-primary btn-sm">عرض الكل</button>
        </div>
        
        <div class="activities-list">
          <div class="activity-item hover-lift" *ngFor="let activity of recentActivities; let i = index">
            <div class="activity-icon" [ngClass]="activity.type">
              <i [class]="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{activity.text}}</p>
              <span class="activity-time">{{activity.time}}</span>
            </div>
            <div class="activity-status" [ngClass]="activity.type"></div>
          </div>
        </div>
      </div>

      <!-- Enhanced Quick Actions -->
      <div class="quick-actions card card-hover">
        <h3 class="gradient-text">الإجراءات السريعة</h3>
        <div class="actions-grid">
          <button class="btn btn-primary btn-lg action-btn hover-scale" routerLink="/customers/new">
            <div class="action-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="action-content">
              <span class="action-title">إضافة عميل جديد</span>
              <span class="action-desc">إنشاء حساب عميل جديد</span>
            </div>
          </button>
          
          <button class="btn btn-secondary btn-lg action-btn hover-scale" routerLink="/meters/new">
            <div class="action-icon">
              <i class="fas fa-plus-circle"></i>
            </div>
            <div class="action-content">
              <span class="action-title">إضافة عداد جديد</span>
              <span class="action-desc">تسجيل عداد ذكي جديد</span>
            </div>
          </button>
          
          <button class="btn btn-success btn-lg action-btn hover-scale" routerLink="/recharges/new">
            <div class="action-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="action-content">
              <span class="action-title">شحن رصيد</span>
              <span class="action-desc">إضافة رصيد للعملاء</span>
            </div>
          </button>
          
          <button class="btn btn-info btn-lg action-btn hover-scale" routerLink="/consumptions">
            <div class="action-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <div class="action-content">
              <span class="action-title">تقرير الاستهلاك</span>
              <span class="action-desc">عرض إحصائيات مفصلة</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="metrics-section">
        <div class="metric-card card card-glass hover-lift">
          <h4 class="gradient-text">أداء النظام</h4>
          <div class="metric-item">
            <span class="metric-label">سرعة الاستجابة</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 95%; background: var(--gradient-success);"></div>
            </div>
            <span class="metric-value">95%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">دقة القراءات</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 98%; background: var(--gradient-primary);"></div>
            </div>
            <span class="metric-value">98%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">توفر النظام</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 99.9%; background: var(--gradient-accent);"></div>
            </div>
            <span class="metric-value">99.9%</span>
          </div>
        </div>

        <div class="metric-card card card-glass hover-lift">
          <h4 class="gradient-text">إحصائيات سريعة</h4>
          <div class="quick-stats">
            <div class="quick-stat">
              <i class="fas fa-clock"></i>
              <span>آخر تحديث: منذ 5 دقائق</span>
            </div>
            <div class="quick-stat">
              <i class="fas fa-database"></i>
              <span>حجم البيانات: 2.3 GB</span>
            </div>
            <div class="quick-stat">
              <i class="fas fa-shield-alt"></i>
              <span>الحماية: نشطة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }

    /* Hero Section */
    .hero-section {
      background: var(--gradient-ultra) !important;
      padding: 3rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-align: center;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 3rem;
      opacity: 0.9;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
    }

    .hero-stat-item {
      text-align: center;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px);
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      border: 1px solid rgba(255, 255, 255, 0.3);
      min-width: 150px;
    }

    .stat-icon-wrapper {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      display: block;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .hero-visual {
      position: absolute;
      top: 50%;
      right: 3rem;
      transform: translateY(-50%);
      z-index: 1;
    }

    .floating-icons {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .floating-icons i {
      position: absolute;
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .floating-icons i:nth-child(1) { top: 20%; left: 20%; }
    .floating-icons i:nth-child(2) { top: 50%; right: 20%; }
    .floating-icons i:nth-child(3) { bottom: 20%; left: 50%; }

    /* Enhanced Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      text-align: center;
      padding: 2.5rem 2rem;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: rgba(255, 255, 255, 0.3);
    }

    .card-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 3px solid rgba(255, 255, 255, 0.3);
    }

    .card-value {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .card-label {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .stat-trend.positive { color: #10b981; }
    .stat-trend.negative { color: #ef4444; }

    /* Charts Section */
    .charts-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .chart-card {
      padding: 2rem;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    .chart-controls {
      display: flex;
      gap: 0.5rem;
    }

    .chart-controls .btn {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .chart-controls .btn.active {
      background: var(--gradient-primary);
      color: white;
      border-color: transparent;
    }

    .chart-placeholder {
      height: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }

    .chart-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.7;
    }

    .chart-preview {
      display: flex;
      align-items: end;
      gap: 0.5rem;
      height: 100px;
      margin-top: 2rem;
    }

    .chart-bar {
      width: 30px;
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
    }

    .chart-bar:hover {
      transform: scaleY(1.1);
    }

    .pie-preview {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      position: relative;
      margin: 2rem auto 0;
      background: conic-gradient(
        var(--gradient-primary) 0deg 120deg,
        var(--gradient-secondary) 120deg 240deg,
        var(--gradient-accent) 240deg 360deg
      );
    }

    /* Activities Section */
    .activities-section {
      padding: 2rem;
      margin-bottom: 3rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .section-header h3 {
      margin: 0;
      font-size: 1.5rem;
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
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      background: var(--bg-secondary);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .activity-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--gradient-primary);
    }

    .activity-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .activity-icon.success { background: var(--gradient-success); }
    .activity-icon.warning { background: var(--gradient-warning); }
    .activity-icon.info { background: var(--gradient-info); }

    .activity-content {
      flex: 1;
    }

    .activity-text {
      margin: 0 0 0.5rem 0;
      font-weight: 500;
      color: var(--text-primary);
    }

    .activity-time {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .activity-status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .activity-status.success { background: var(--success-color); }
    .activity-status.warning { background: var(--warning-color); }
    .activity-status.info { background: var(--info-color); }

    /* Quick Actions */
    .quick-actions {
      padding: 2rem;
      margin-bottom: 3rem;
    }

    .quick-actions h3 {
      margin: 0 0 2rem 0;
      font-size: 1.5rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .action-btn {
      height: 80px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
      position: relative;
      overflow: hidden;
    }

    .action-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: var(--transition-slow);
    }

    .action-btn:hover::before {
      left: 100%;
    }

    .action-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .action-content {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .action-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .action-desc {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    /* Metrics Section */
    .metrics-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      padding: 2rem;
    }

    .metric-card h4 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
    }

    .metric-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .metric-label {
      min-width: 120px;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .metric-bar {
      flex: 1;
      height: 8px;
      background: var(--bg-tertiary);
      border-radius: 4px;
      overflow: hidden;
    }

    .metric-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 1s ease;
    }

    .metric-value {
      min-width: 50px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .quick-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .quick-stat {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .quick-stat i {
      width: 20px;
      color: var(--primary-color);
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .charts-section {
        grid-template-columns: 1fr;
      }
      
      .metrics-section {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .hero-section {
        padding: 2rem 1rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-stats {
        flex-direction: column;
        gap: 1rem;
      }

      .hero-stat-item {
        min-width: auto;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }

      .hero-visual {
        display: none;
      }
    }

    /* Animations */
    .fade-in { animation: fadeIn 0.8s ease-out; }
    .slide-in-right { animation: slideInRight 0.8s ease-out; }
    .slide-in-left { animation: slideInLeft 0.8s ease-out; }

    /* Hover Effects */
    .hover-lift:hover {
      transform: translateY(-8px);
      transition: var(--transition);
    }

    .hover-scale:hover {
      transform: scale(1.05);
      transition: var(--transition);
    }

    /* Glass Effect */
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Gradient Text */
    .gradient-text {
      background: var(--gradient-ultra);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Rainbow Text */
    .rainbow-text {
      background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff0080);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: rainbow 3s ease-in-out infinite;
    }

    @keyframes rainbow {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* Floating Animation */
    .floating {
      animation: floating 3s ease-in-out infinite;
    }

    @keyframes floating {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `]
})
export class DashboardComponent implements OnInit {
  recentActivities = [
    {
      type: 'success',
      icon: 'fas fa-user-plus',
      text: 'تم إضافة عميل جديد: أحمد محمد',
      time: 'منذ 5 دقائق'
    },
    {
      type: 'info',
      icon: 'fas fa-credit-card',
      text: 'تم شحن رصيد للعميل: سارة أحمد - 500 ريال',
      time: 'منذ 15 دقيقة'
    },
    {
      type: 'warning',
      icon: 'fas fa-exclamation-triangle',
      text: 'تحذير: عداد رقم 12345 يحتاج للصيانة',
      time: 'منذ ساعة'
    },
    {
      type: 'success',
      icon: 'fas fa-file-contract',
      text: 'تم إنشاء عقد جديد للعميل: محمد علي',
      time: 'منذ ساعتين'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Load dashboard data
  }
}



