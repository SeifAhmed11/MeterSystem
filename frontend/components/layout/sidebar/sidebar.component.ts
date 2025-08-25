import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <!-- Logo Section -->
      <div class="sidebar-header">
        <div class="logo-container" (click)="toggleSidebar()">
          <div class="logo-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="logo-text" *ngIf="!isCollapsed">
            <h3>نظام العدادات</h3>
            <p>Meter System</p>
          </div>
        </div>
        <button class="toggle-btn" (click)="toggleSidebar()">
          <i [class]="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item" *ngFor="let item of menuItems" [class.active]="isActive(item.route)">
            <a [routerLink]="item.route" class="nav-link" [class.active]="isActive(item.route)">
              <div class="nav-icon">
                <i [class]="item.icon"></i>
              </div>
              <span class="nav-text" *ngIf="!isCollapsed">{{ item.label }}</span>
              <div class="nav-badge" *ngIf="item.badge && !isCollapsed">
                {{ item.badge }}
              </div>
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Section -->
      <div class="sidebar-footer" *ngIf="!isCollapsed">
        <div class="user-info">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="user-details">
            <div class="user-name">{{ currentUser?.name || 'المستخدم' }}</div>
            <div class="user-role">{{ currentUser?.role || 'مستخدم' }}</div>
          </div>
        </div>
        <div class="user-actions">
          <button class="action-btn" title="الإعدادات">
            <i class="fas fa-cog"></i>
          </button>
          <button class="action-btn" title="تسجيل الخروج" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      <!-- Collapsed User Info -->
      <div class="sidebar-footer-collapsed" *ngIf="isCollapsed">
        <div class="user-avatar-small">
          <i class="fas fa-user"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: var(--bg-primary);
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
      box-shadow: var(--shadow-lg);
      position: relative;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 80px;
    }

    /* Sidebar Header */
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .logo-container:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      width: 45px;
      height: 45px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-icon i {
      font-size: 1.25rem;
      color: white;
    }

    .logo-text h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .logo-text p {
      margin: 0;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .toggle-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-secondary);
    }

    .toggle-btn:hover {
      background: var(--bg-tertiary);
      color: var(--primary-color);
      transform: scale(1.1);
    }

    /* Navigation Menu */
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 0.25rem 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.875rem 1rem;
      text-decoration: none;
      color: var(--text-secondary);
      border-radius: var(--border-radius);
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }

    .nav-link:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
      transform: translateX(-4px);
    }

    .nav-link.active {
      background: var(--gradient-primary);
      color: white;
      box-shadow: var(--shadow-md);
    }

    

    .nav-icon {
      width: 20px;
      text-align: center;
      flex-shrink: 0;
    }

    .nav-icon i {
      font-size: 1.1rem;
    }

    .nav-text {
      font-weight: 500;
      white-space: nowrap;
    }

    .nav-badge {
      background: var(--error-color);
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      margin-right: auto;
      font-weight: 600;
    }

    /* Sidebar Footer */
    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      background: var(--bg-secondary);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 45px;
      height: 45px;
      background: var(--gradient-secondary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-avatar i {
      font-size: 1.25rem;
      color: white;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .user-role {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .user-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-secondary);
    }

    .action-btn:hover {
      background: var(--primary-color);
      color: white;
      transform: scale(1.1);
    }

    /* Collapsed Footer */
    .sidebar-footer-collapsed {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
      background: var(--bg-secondary);
      display: flex;
      justify-content: center;
    }

    .user-avatar-small {
      width: 40px;
      height: 40px;
      background: var(--gradient-secondary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
    }

    .user-avatar-small:hover {
      transform: scale(1.1);
    }

    .user-avatar-small i {
      font-size: 1rem;
      color: white;
    }

    /* Scrollbar Styling */
    .sidebar-nav::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: transparent;
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: var(--primary-color);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1000;
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar.collapsed {
        width: 280px;
      }
    }

    /* Animation for collapsed state */
    .sidebar.collapsed .nav-text,
    .sidebar.collapsed .logo-text,
    .sidebar.collapsed .user-details,
    .sidebar.collapsed .user-actions {
      opacity: 0;
      visibility: hidden;
    }

    .sidebar.collapsed .nav-link {
      justify-content: center;
      padding: 0.875rem;
    }

    .sidebar.collapsed .nav-icon {
      margin: 0;
    }

    .sidebar.collapsed .logo-container {
      justify-content: center;
    }

    .sidebar.collapsed .toggle-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  `]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser: any = null;

  menuItems = [
    {
      label: 'لوحة التحكم',
      route: '/dashboard',
      icon: 'fas fa-tachometer-alt',
      badge: null
    },
    {
      label: 'العملاء',
      route: '/dashboard/customers',
      icon: 'fas fa-users',
      badge: null
    },
    {
      label: 'العدادات',
      route: '/dashboard/meters',
      icon: 'fas fa-bolt',
      badge: null
    },
    {
      label: 'العقود',
      route: '/dashboard/contracts',
      icon: 'fas fa-file-contract',
      badge: null
    },
    {
      label: 'إعادة الشحن',
      route: '/dashboard/recharges',
      icon: 'fas fa-credit-card',
      badge: '3'
    },
    {
      label: 'الاستهلاك',
      route: '/dashboard/consumptions',
      icon: 'fas fa-tachometer-alt',
      badge: null
    },
    {
      label: 'المستخدمين',
      route: '/dashboard/users',
      icon: 'fas fa-user-shield',
      badge: null
    },
    {
      label: 'التقارير',
      route: '/dashboard/reports',
      icon: 'fas fa-chart-bar',
      badge: null
    },
    {
      label: 'الإعدادات',
      route: '/dashboard/settings',
      icon: 'fas fa-cog',
      badge: null
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get current user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }

    // Check screen size for mobile
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login
    this.router.navigate(['/login']);
  }

  private checkScreenSize(): void {
    if (window.innerWidth <= 768) {
      this.isCollapsed = false;
    }
  }
}





