import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Customer {
  id: string;
  nationalId: string;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface CustomerDto {
  id: string;
  nationalId: string;
  name: string;
  address: string;
  numberOfContracts?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  nationalId: string;
  name: string;
  address: string;
}

export interface UpdateCustomerRequest {
  nationalId?: string;
  name?: string;
  address?: string;
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

export interface CustomerQueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = `${environment.apiUrl}/customer`;

  constructor(private http: HttpClient) {}

  /**
   * الحصول على قائمة العملاء مع الترقيم
   */
  getCustomers(params: CustomerQueryParams = {}): Observable<PaginatedResponse<CustomerDto>> {
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

    return this.http.get<PaginatedResponse<CustomerDto>>(this.apiUrl, { params: httpParams });
  }

  /**
   * الحصول على عميل محدد بواسطة المعرف
   */
  getCustomerById(id: string): Observable<BaseResponse<CustomerDto>> {
    return this.http.get<BaseResponse<CustomerDto>>(`${this.apiUrl}/${id}`);
  }

  /**
   * إنشاء عميل جديد
   */
  createCustomer(customer: CreateCustomerRequest): Observable<BaseResponse<CustomerDto>> {
    return this.http.post<BaseResponse<CustomerDto>>(this.apiUrl, customer);
  }

  /**
   * تحديث بيانات العميل
   */
  updateCustomer(id: string, customer: UpdateCustomerRequest): Observable<BaseResponse<CustomerDto>> {
    return this.http.put<BaseResponse<CustomerDto>>(`${this.apiUrl}/${id}`, customer);
  }

  /**
   * حذف العميل (حذف ناعم)
   */
  deleteCustomer(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${id}`);
  }

  /**
   * البحث عن العملاء
   */
  searchCustomers(query: string, page: number = 1, pageSize: number = 20): Observable<PaginatedResponse<CustomerDto>> {
    return this.getCustomers({
      search: query,
      page,
      pageSize
    });
  }

  /**
   * الحصول على جميع العملاء بدون ترقيم (للقوائم المنسدلة)
   */
  getAllCustomers(): Observable<BaseResponse<CustomerDto[]>> {
    return this.http.get<BaseResponse<CustomerDto[]>>(`${this.apiUrl}/all`);
  }

  // Simple list and get by nationalId matching provided endpoints
  list(): Observable<BaseResponse<CustomerDto[]> | any> {
    return this.http.get<any>(this.apiUrl, { headers: { 'Accept-Language': 'en', accept: '*/*' } });
  }

  getByNationalId(nationalId: string): Observable<BaseResponse<CustomerDto> | any> {
    return this.http.get<any>(`${this.apiUrl}/${nationalId}`, { headers: { 'Accept-Language': 'en', accept: '*/*' } });
  }

  /**
   * التحقق من وجود عميل بالرقم القومي
   */
  checkNationalIdExists(nationalId: string, excludeId?: string): Observable<BaseResponse<boolean>> {
    let httpParams = new HttpParams().set('nationalId', nationalId);
    if (excludeId) {
      httpParams = httpParams.set('excludeId', excludeId);
    }
    
    return this.http.get<BaseResponse<boolean>>(`${this.apiUrl}/check-national-id`, { params: httpParams });
  }

  /**
   * الحصول على إحصائيات العملاء
   */
  getCustomerStats(): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(`${this.apiUrl}/stats`);
  }

  /**
   * تصدير العملاء إلى Excel
   */
  exportCustomers(params: CustomerQueryParams = {}): Observable<Blob> {
    let httpParams = new HttpParams();
    
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
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
   * رفع ملف Excel لاستيراد العملاء
   */
  importCustomers(file: File): Observable<BaseResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<BaseResponse<any>>(`${this.apiUrl}/import`, formData);
  }
}





