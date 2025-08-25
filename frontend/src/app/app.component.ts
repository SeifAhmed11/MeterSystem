import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- Toast Notifications -->
    <app-toast></app-toast>
    
   

    <!-- Auth Pages (Login/Register) -->
    <div *ngIf="isAuthPage" class="auth-container">
      <router-outlet></router-outlet>
    </div>

    <!-- Dashboard Layout -->
    <div *ngIf="!isAuthPage" class="app-container">
      <app-header-enhanced></app-header-enhanced>
      <div class="app-body">
        <app-sidebar></app-sidebar>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-gradient));
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-spinner {
      text-align: center;
      color: white;
    }

    .loading-text {
      margin-top: 20px;
      font-size: 18px;
      font-weight: 500;
    }

    .auth-container {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--primary-gradient));
    }

    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--background-color);
    }

    .app-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      padding: 32px 24px 24px 24px; /* padding-top أكبر لضمان المساحة */
      overflow-y: auto;
      background-color: var(--background-light);
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'نظام العدادات';
  isLoading = true;
  isAuthPage = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Hide loading after 2 seconds
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    // Check if current route is auth page
    this.router.events.subscribe(() => {
      this.isAuthPage = this.router.url.includes('/login') || 
                       this.router.url.includes('/register');
    });

    // Check authentication status
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}




