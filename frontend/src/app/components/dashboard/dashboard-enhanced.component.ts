import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-enhanced',
  templateUrl: './dashboard-enhanced.component.html',
  styleUrls: ['./dashboard-enhanced.component.scss']
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
