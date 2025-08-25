import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Meter {
  id: string;
  serial: string;
  type: MeterType;
  installedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface MeterDto {
  id?: string;
  serial?: string | number;
  type?: string;
  installedDate?: string;
  createdAt?: string;
  updatedAt?: string;
  isAvailable?: boolean;
  customerName?: string;
  address?: string;
  status?: string;
}

export enum MeterType {
  Electric = 'Electric',
  Water = 'Water'
}

export interface CreateMeterRequest {
  serial: string;
  type: string;
  installedDate: string;
}

export interface UpdateMeterRequest {
  serial?: string;
  type?: string;
  installedDate?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  message: string;
  success: boolean;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface MeterQueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: string;
  isAvailable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  private readonly apiUrl = `${environment.apiUrl}/meter`;

  constructor(private http: HttpClient) {}

  /**
   * الحصول على قائمة العدادات مع الترقيم
   */
  getMeters(params: MeterQueryParams = {}): Observable<PaginatedResponse<MeterDto>> {
    let httpParams = new HttpParams();
    
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }
    if (params.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params.isAvailable !== undefined) {
      httpParams = httpParams.set('isAvailable', params.isAvailable.toString());
    }

    return this.http.get<PaginatedResponse<MeterDto>>(this.apiUrl, { params: httpParams });
  }

  /**
   * الحصول على عداد محدد بواسطة المعرف
   */
  getMeterById(id: string): Observable<BaseResponse<MeterDto>> {
    return this.http.get<BaseResponse<MeterDto>>(`${this.apiUrl}/${id}`);
  }

  /**
   * إنشاء عداد جديد
   */
  createMeter(meter: CreateMeterRequest): Observable<BaseResponse<MeterDto>> {
    return this.http.post<BaseResponse<MeterDto>>(this.apiUrl, meter);
  }

  /**
   * تحديث بيانات العداد
   */
  updateMeter(id: string, meter: UpdateMeterRequest): Observable<BaseResponse<MeterDto>> {
    return this.http.put<BaseResponse<MeterDto>>(`${this.apiUrl}/${id}`, meter);
  }

  /**
   * حذف العداد (حذف ناعم)
   */
  deleteMeter(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${id}`);
  }

  /**
   * البحث عن العدادات
   */
  searchMeters(query: string, page: number = 1, pageSize: number = 20): Observable<PaginatedResponse<MeterDto>> {
    return this.getMeters({
      search: query,
      page,
      pageSize
    });
  }

  /**
   * الحصول على العدادات المتاحة (غير المربوطة بعقود)
   */
  getAvailableMeters(): Observable<BaseResponse<MeterDto[]>> {
    return this.http.get<BaseResponse<MeterDto[]>>(`${this.apiUrl}/available`);
  }

  /**
   * الحصول على العدادات حسب النوع
   */
  getMetersByType(type: string): Observable<BaseResponse<MeterDto[]>> {
    return this.http.get<BaseResponse<MeterDto[]>>(`${this.apiUrl}/by-type/${type}`);
  }

  /**
   * التحقق من وجود عداد بالرقم التسلسلي
   */
  checkSerialExists(serial: string, excludeId?: string): Observable<BaseResponse<boolean>> {
    let httpParams = new HttpParams().set('serial', serial);
    if (excludeId) {
      httpParams = httpParams.set('excludeId', excludeId);
    }
    
    return this.http.get<BaseResponse<boolean>>(`${this.apiUrl}/check-serial`, { params: httpParams });
  }

  /**
   * الحصول على إحصائيات العدادات
   */
  getMeterStats(): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(`${this.apiUrl}/stats`);
  }

  /**
   * الحصول على أنواع العدادات
   */
  getMeterTypes(): string[] {
    return Object.values(MeterType);
  }

  /**
   * تصدير العدادات إلى Excel
   */
  exportMeters(params: MeterQueryParams = {}): Observable<Blob> {
    let httpParams = new HttpParams();
    
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    return this.http.get(`${this.apiUrl}/export`, { 
      params: httpParams,
      responseType: 'blob'
    });
  }

  /**
   * رفع ملف Excel لاستيراد العدادات
   */
  importMeters(file: File): Observable<BaseResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<BaseResponse<any>>(`${this.apiUrl}/import`, formData);
  }

  /**
   * الحصول على تاريخ القراءات لعداد محدد
   */
  getMeterReadings(meterId: string, params: any = {}): Observable<BaseResponse<any[]>> {
    let httpParams = new HttpParams();
    
    if (params.startDate) {
      httpParams = httpParams.set('startDate', params.startDate);
    }
    if (params.endDate) {
      httpParams = httpParams.set('endDate', params.endDate);
    }
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    return this.http.get<BaseResponse<any[]>>(`${this.apiUrl}/${meterId}/readings`, { params: httpParams });
  }

  /**
   * الحصول على آخر قراءة لعداد محدد
   */
  getLastReading(meterId: string): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(`${this.apiUrl}/${meterId}/last-reading`);
  }

  // Simple wrappers for plain list and get by serial with headers
  list(): Observable<MeterDto[] | any> {
    return this.http.get<any>(this.apiUrl, { headers: new HttpHeaders({ 'Accept-Language': 'en', accept: '*/*' }) });
  }

  getBySerial(serial: string | number): Observable<MeterDto | any> {
    return this.http.get<any>(`${this.apiUrl}/${serial}`, { headers: new HttpHeaders({ 'Accept-Language': 'en', accept: '*/*' }) });
  }
}





