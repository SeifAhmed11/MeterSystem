import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseResponse, PaginatedResponse, QueryParams } from '../models/common.model';

export interface RechargeDto {
  id: string;
  amount: number;
  meterId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private readonly apiUrl = `${environment.apiUrl}/recharge`;

  constructor(private http: HttpClient) {}

  getRecharges(params: QueryParams = {}): Observable<PaginatedResponse<RechargeDto>> {
    return this.http.get<PaginatedResponse<RechargeDto>>(this.apiUrl, { params: params as any });
  }

  // GET /api/Recharge/{SerialId}
  getRechargeBySerial(serialId: string | number): Observable<BaseResponse<RechargeDto>> {
    return this.http.get<BaseResponse<RechargeDto>>(`${this.apiUrl}/${serialId}`, {
      headers: this.defaultHeaders()
    });
  }

  // POST /api/Recharge
  createRecharge(body: { amount: number; meterId: string }): Observable<BaseResponse<RechargeDto>> {
    return this.http.post<BaseResponse<RechargeDto>>(this.apiUrl, body, {
      headers: this.defaultHeaders(true)
    });
  }

  // GET /api/Recharge (list)
  listAll(): Observable<BaseResponse<RechargeDto[]>> {
    return this.http.get<BaseResponse<RechargeDto[]>>(this.apiUrl, {
      headers: this.defaultHeaders()
    });
  }

  // GET /api/Recharge/GetLastCharge/{serial}
  getLastCharge(serial: string | number): Observable<BaseResponse<RechargeDto>> {
    return this.http.get<BaseResponse<RechargeDto>>(`${this.apiUrl}/GetLastCharge/${serial}`, {
      headers: this.defaultHeaders()
    });
  }

  // GET /api/Recharge/FilterByDate?serial=1&from=2020-4-1&to=2025-11-1
  filterByDate(serial: string | number, from: string, to: string): Observable<BaseResponse<RechargeDto[]>> {
    const params = new HttpParams()
      .set('serial', String(serial))
      .set('from', from)
      .set('to', to);
    return this.http.get<BaseResponse<RechargeDto[]>>(`${this.apiUrl}/FilterByDate`, {
      params,
      headers: this.defaultHeaders()
    });
  }

  private defaultHeaders(json = false): HttpHeaders {
    let headers = new HttpHeaders({ 'Accept-Language': 'en', accept: '*/*' });
    if (json) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }
}





