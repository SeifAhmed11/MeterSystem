import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseResponse, PaginatedResponse, QueryParams } from '../models/common.model';

export interface ConsumptionDto {
  id: string;
  readingDate: string;
  previousReading: number;
  currentReading: number;
  consumptionUnits: number;
  meterId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private readonly apiUrl = `${environment.apiUrl}/consumption`;

  constructor(private http: HttpClient) {}

  getConsumptions(params: QueryParams = {}): Observable<PaginatedResponse<ConsumptionDto>> {
    return this.http.get<PaginatedResponse<ConsumptionDto>>(this.apiUrl, { params: params as any });
  }

  getConsumptionById(id: string): Observable<BaseResponse<ConsumptionDto>> {
    return this.http.get<BaseResponse<ConsumptionDto>>(`${this.apiUrl}/${id}`);
  }

  createConsumption(consumption: any): Observable<BaseResponse<ConsumptionDto>> {
    return this.http.post<BaseResponse<ConsumptionDto>>(this.apiUrl, consumption);
  }

  updateConsumption(id: string, consumption: any): Observable<BaseResponse<ConsumptionDto>> {
    return this.http.put<BaseResponse<ConsumptionDto>>(`${this.apiUrl}/${id}`, consumption);
  }

  deleteConsumption(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${id}`);
  }
}





