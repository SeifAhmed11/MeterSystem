import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseResponse, PaginatedResponse, QueryParams } from '../models/common.model';
import { UserDto, PendingUserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getPendingAdmins(): Observable<BaseResponse<PendingUserDto[]>> {
    return this.http.get<BaseResponse<PendingUserDto[]>>(`${this.apiUrl}/pending-admins`);
  }

  confirmAdminEmail(email: string): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.apiUrl}/confirm-admin-email`, { email });
  }

  getUsers(params: QueryParams = {}): Observable<PaginatedResponse<UserDto>> {
    return this.http.get<PaginatedResponse<UserDto>>(`${this.apiUrl}/all`, { params: params as any });
  }

  getUserById(id: string): Observable<BaseResponse<UserDto>> {
    return this.http.get<BaseResponse<UserDto>>(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<BaseResponse<UserDto>> {
    return this.http.post<BaseResponse<UserDto>>(`${this.apiUrl}/create`, user);
  }

  updateUser(id: string, user: any): Observable<BaseResponse<UserDto>> {
    return this.http.put<BaseResponse<UserDto>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${id}`);
  }
}





