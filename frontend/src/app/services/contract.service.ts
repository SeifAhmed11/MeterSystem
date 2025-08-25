import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseResponse, PaginatedResponse, QueryParams } from '../models/common.model';

export interface ContractDto {
  id: string;
  customerCode: string;
  installationAddress: string;
  activationDate: string;
  fixedFees: number;
  meterId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  meter?: any;
  customer?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly apiUrl = `${environment.apiUrl}/contract`;

  constructor(private http: HttpClient) {}

  getContracts(params: QueryParams = {}): Observable<PaginatedResponse<ContractDto>> {
    return this.http.get<PaginatedResponse<ContractDto>>(this.apiUrl, { params: params as any, headers: this.headers() });
  }

  getContractById(id: string): Observable<BaseResponse<ContractDto>> {
    return this.http.get<BaseResponse<ContractDto>>(`${this.apiUrl}/${id}`);
  }

  createContract(contract: any): Observable<BaseResponse<ContractDto>> {
    return this.http.post<BaseResponse<ContractDto>>(this.apiUrl, contract, { headers: this.headers(true) });
  }

  updateContract(id: string, contract: any): Observable<BaseResponse<ContractDto>> {
    return this.http.put<BaseResponse<ContractDto>>(`${this.apiUrl}/${id}`, contract, { headers: this.headers(true) });
  }

  deleteContract(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }

  // Extra endpoints
  listAll(): Observable<BaseResponse<ContractDto[]>> {
    return this.http.get<BaseResponse<ContractDto[]>>(`${this.apiUrl}/GetAll`, { headers: this.headers() });
  }

  listDeleted(): Observable<BaseResponse<ContractDto[]>> {
    return this.http.get<BaseResponse<ContractDto[]>>(`${this.apiUrl}/GetAllDeleted`, { headers: this.headers() });
  }

  filter(params: { from?: string; to?: string; customerCode?: string; meterSerial?: string; }): Observable<BaseResponse<ContractDto[]>> {
    let p = new HttpParams();
    if (params.from) p = p.set('from', params.from);
    if (params.to) p = p.set('to', params.to);
    if (params.customerCode) p = p.set('customerCode', params.customerCode);
    if (params.meterSerial) p = p.set('meterSerial', params.meterSerial);
    return this.http.get<BaseResponse<ContractDto[]>>(this.apiUrl, { params: p, headers: this.headers() });
  }

  getByCustomerCode(customerCode: string): Observable<BaseResponse<ContractDto[]>> {
    return this.http.get<BaseResponse<ContractDto[]>>(`${this.apiUrl}/by-customer-code/${customerCode}`, { headers: this.headers() });
  }

  getByNationalId(nationalId: string): Observable<BaseResponse<ContractDto[]>> {
    return this.http.get<BaseResponse<ContractDto[]>>(`${this.apiUrl}/by-National-id/${nationalId}`, { headers: this.headers() });
  }

  getByMeterSerial(meterSerial: string): Observable<BaseResponse<ContractDto[]>> {
    return this.http.get<BaseResponse<ContractDto[]>>(`${this.apiUrl}/by-Meter-serial/${meterSerial}`, { headers: this.headers() });
  }

  export(type: 0 | 1, from: string, to: string): Observable<Blob> {
    const params = new HttpParams().set('type', String(type)).set('from', from).set('to', to);
    return this.http.get(`${this.apiUrl}/export`, { params, responseType: 'blob' });
  }

  private headers(json = false): HttpHeaders {
    let h = new HttpHeaders({ 'Accept-Language': 'en', accept: '*/*' });
    if (json) h = h.set('Content-Type', 'application/json');
    return h;
  }
}





