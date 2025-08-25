import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Loading Screen -->
      <div *ngIf="loading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
      
      <!-- Main App -->
      <div *ngIf="!loading" class="app-content">
        <!-- Auth Pages (Login/Register) -->
        <div *ngIf="isAuthPage" class="auth-container">
          <router-outlet></router-outlet>
        </div>
        
        <!-- Dashboard Layout -->
        <div *ngIf="!isAuthPage" class="dashboard-layout">
          <app-header></app-header>
          <div class="dashboard-main">
            <app-sidebar></app-sidebar>
            <main class="main-content">
              <router-outlet></router-outlet>
            </main>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: var(--bg-secondary);
    }
    
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--gradient-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .loading-content {
      text-align: center;
      color: white;
    }
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .auth-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--gradient-primary);
      padding: 2rem;
    }
    
    .dashboard-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .dashboard-main {
      display: flex;
      flex: 1;
    }
    
    .main-content {
      flex: 1;
      padding: 2rem;
      background: var(--bg-secondary);
      overflow-y: auto;
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  loading = true;
  isAuthPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    // Check if current route is auth page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAuthPage = ['/login', '/register'].includes(event.url);
    });
  }
}





