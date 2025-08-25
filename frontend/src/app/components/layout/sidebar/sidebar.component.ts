import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DashboardService } from '../../../services/dashboard.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <!-- Logo and Toggle -->
      <div class="sidebar-header">
        <div class="logo" *ngIf="!isCollapsed">
          <img class="elsewedy-logo" src="../../../assets/images/Elsewedy-EMG-logo.png" alt="Elsewedy EMG"/>
        </div>
        <button mat-icon-button (click)="toggleSidebar()" class="toggle-btn">
          <!-- <mat-icon>{{isCollapsed ? 'menu_open' : 'menu'}}</mat-icon> -->
          {{isCollapsed ? '+' : 'X'}}
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item" *ngFor="let item of menuItems">
            <a 
              [routerLink]="item.route" 
              routerLinkActive="active"
              class="nav-link"
              *ngIf="hasPermission(item.roles)"
            >
              <i [class]="item.icon"></i>
              <span class="nav-text" *ngIf="!isCollapsed">{{item.label}}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Info -->
      <div class="sidebar-footer" *ngIf="!isCollapsed">
        <div class="user-info">
          <div class="user-avatar">
            <img src="assets/images/default-avatar.png" alt="المستخدم">
          </div>
          <div class="user-details">
            <p class="user-name">{{currentUser?.name || currentUser?.userName || 'المستخدم'}}</p>
            <p class="user-role">{{currentUser?.role || (currentUser?.roles && currentUser?.roles[0]) || 'مستخدم'}}</p>
          </div>
        </div>
        <button mat-icon-button (click)="logout()" class="logout-btn" matTooltip="تسجيل الخروج">
          <mat-icon>exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: white;
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      box-shadow: var(--shadow-sm);
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .logo .elsewedy-logo { height: 28px; width: auto; }

    .toggle-btn {
      color: var(--text-secondary);
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 8px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 14px 20px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      border-radius: 0 25px 25px 0;
      margin-right: 10px;
    }

    .nav-link:hover {
      background: var(--background-light);
      color: var(--primary-color);
      transform: translateX(-5px);
    }

    .nav-link.active {
      background: var(--gradient-primary);
      color: white;
      box-shadow: var(--shadow-md);
    }

    

    .nav-link i {
      font-size: 20px;
      min-width: 24px;
      text-align: center;
    }

    .nav-text {
      margin-right: 16px;
      font-weight: 500;
      white-space: nowrap;
    }

    .nav-badge {
      margin-right: auto;
      background: var(--error-color);
      color: white;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      margin: 0 0 4px 0;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
    }

    .user-role {
      margin: 0;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .logout-btn {
      color: var(--error-color);
    }

    .logout-btn:hover {
      background: rgba(244, 67, 54, 0.1);
    }

    /* Collapsed state styles */
    .sidebar.collapsed .nav-link {
      justify-content: center;
      padding: 14px;
      margin-left: 0;
      border-radius: 0;
    }

    .sidebar.collapsed .nav-link:hover {
      transform: none;
    }

    .sidebar.collapsed .nav-link.active::before {
      display: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: -280px;
        z-index: 1000;
        transition: left 0.3s ease;
      }

      .sidebar.show {
        left: 0;
      }

      .sidebar.collapsed {
        left: -70px;
      }

      .sidebar.collapsed.show {
        left: 0;
        width: 70px;
      }
    }

    /* Custom scrollbar */
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
      background: var(--text-secondary);
    }
  `]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser: any = null;

  menuItems = [
    {
      label: 'لوحة التحكم',
      icon: 'fas fa-home',
      route: '/dashboard',
      roles: ['SuperAdmin', 'Admin', 'User']
    },
    {
      label: 'العملاء',
      icon: 'fas fa-users',
      route: '/customers',
      roles: ['SuperAdmin', 'Admin']
    },
    {
      label: 'العدادات',
      icon: 'fas fa-tachometer-alt',
      route: '/meters',
      roles: ['SuperAdmin', 'Admin']
    },
    {
      label: 'العقود',
      icon: 'fas fa-file-contract',
      route: '/contracts',
      roles: ['SuperAdmin', 'Admin']
    },
    {
      label: 'الشحنات',
      icon: 'fas fa-credit-card',
      route: '/recharges',
      roles: ['SuperAdmin', 'Admin', 'User']
    },
    {
      label: 'المشرفين المعلقين',
      icon: 'fas fa-user-clock',
      route: '/pending-admins',
      roles: ['SuperAdmin']
    },
    {
      label: 'التقارير',
      icon: 'fas fa-chart-line',
      route: '/reports',
      roles: ['SuperAdmin', 'Admin']
    },
    {
      label: 'الإعدادات',
      icon: 'fas fa-cog',
      route: '/settings',
      roles: ['SuperAdmin', 'Admin']
    }
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Sidebar - ngOnInit called');
    
    // Get current user info
    this.currentUser = this.authService.getCurrentUser();
    console.log('Sidebar - Current user:', this.currentUser);
    console.log('Sidebar - User roles:', this.currentUser?.roles);

    // Listen to route changes to update active state
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update active menu item if needed
      });

    // Subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      console.log('Sidebar - User changed:', user);
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  hasPermission(roles: string[]): boolean {
    // Allow all permissions for now
    return true;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}




