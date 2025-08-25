import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DashboardService } from '../../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <div class="app-header">
      <!-- Brand -->
      <div class="brand">
        <img class="elsewedy-logo" src="../../../assets/images/Elsewedy-EMG-logo.png" alt="Elsewedy EMG"/>
      </div>

      <!-- Center - Search -->
      <div class="header-center">
        <div class="search-field">
          <input type="text" [(ngModel)]="searchQuery" (keyup)="onSearch($event)" placeholder="البحث...">
          <i class="fas fa-search"></i>
        </div>
      </div>

      <!-- Right side - User -->
      <div class="header-right">
        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-avatar">
            <img src="assets/images/default-avatar.png" alt="المستخدم">
          </div>
          <div class="user-info">
            <span class="user-name">{{currentUser?.name || currentUser?.userName || 'أحمد محمد'}}</span>
            <span class="user-email">{{currentUser?.email || 'ahmed@example.com'}}</span>
          </div>
          <button class="logout-btn" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-header {
      background: #fff;
      color: #000;
      border-bottom: 2px solid #e31e26;
      height: 70px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
      z-index: 1000;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand .elsewedy-logo {
      height: 40px;
      width: auto;
    }

    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
      max-width: 500px;
      margin: 0 30px;
    }

    .search-field {
      position: relative;
      width: 100%;
    }

    .search-field input {
      width: 100%;
      padding: 12px 45px 12px 15px;
      border: 2px solid #81786f;
      border-radius: 10px;
      font-size: 14px;
      background: #fff;
      color: #000;
      font-weight: 500;
    }

    .search-field input:focus {
      outline: none;
      border-color: #e31e26;
      box-shadow: 0 0 0 3px rgba(227,30,38,0.1);
    }

    .search-field input::placeholder {
      color: #81786f;
    }

    .search-field i {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #81786f;
      font-size: 16px;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px 15px;
      border-radius: 10px;
      transition: all 0.3s ease;
      border: 1px solid #f0f0f0;
    }

    .user-profile:hover {
      background: #f8f9fa;
      border-color: #e31e26;
    }

    .user-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #e31e26;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .user-name {
      font-weight: 700;
      font-size: 15px;
      color: #000;
      margin-bottom: 2px;
    }

    .user-email {
      font-size: 13px;
      color: #81786f;
      direction: ltr;
      font-weight: 500;
    }

    .logout-btn {
      background: #e31e26;
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 10px;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .logout-btn:hover {
      background: #c41e24;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(227,30,38,0.3);
    }

    .logout-btn i {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .app-header {
        padding: 0 15px;
        height: 60px;
      }
      
      .header-center {
        display: none;
      }
      
      .user-info {
        display: none;
      }
      
      .brand .elsewedy-logo {
        height: 32px;
      }

      .user-avatar {
        width: 36px;
        height: 36px;
      }

      .logout-btn {
        padding: 8px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user info
    this.currentUser = this.authService.getCurrentUser();
  }

  onSearch(event: any): void {
    this.searchQuery = event.target.value;
    // Implement search functionality if needed
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}





