import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  customers: number;
  meters: number;
  contracts: number;
  recharges: number;
  consumptions: number;
  users: number;
  pendingAdmins: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      'Accept-Language': 'en',
      'accept': '*/*'
    };
  }

  /**
   * Get all dashboard statistics
   */
  getDashboardStats(): Observable<DashboardStats> {
    return forkJoin({
      customers: this.getCustomersCount(),
      meters: this.getMetersCount(),
      contracts: this.getContractsCount(),
      recharges: this.getRechargesCount(),
      consumptions: this.getConsumptionsCount(),
      users: this.getUsersCount(),
      pendingAdmins: this.getPendingAdminsCount()
    });
  }

  /**
   * Get customers count
   */
  private getCustomersCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/Customer`, { headers: this.headers() })
      .pipe(
        map(response => response.data?.length || 0),
        catchError(() => of(0))
      );
  }

  /**
   * Get meters count
   */
  private getMetersCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/Meter`, { headers: this.headers() })
      .pipe(
        map(response => response.data?.length || 0),
        catchError(() => of(0))
      );
  }

  /**
   * Get contracts count
   */
  private getContractsCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/Contract/GetAll`, { headers: this.headers() })
      .pipe(
        map(response => response.data?.length || 0),
        catchError(() => of(0))
      );
  }

  /**
   * Get recharges count
   */
  private getRechargesCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/Recharge`, { headers: this.headers() })
      .pipe(
        map(response => response.data?.length || 0),
        catchError(() => of(0))
      );
  }

  /**
   * Get consumptions count
   */
  private getConsumptionsCount(): Observable<number> {
    // Since consumptions page was removed, return 0 or implement if API exists
    return of(0);
  }

  /**
   * Get users count
   */
  private getUsersCount(): Observable<number> {
    // Since users page was removed, return 0 or implement if API exists
    return of(0);
  }

  /**
   * Get pending admins count
   */
  private getPendingAdminsCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/User/pending-admins`, { headers: this.headers() })
      .pipe(
        map(response => response.data?.length || 0),
        catchError(() => of(0))
      );
  }
}
