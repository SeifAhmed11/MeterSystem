import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log('RoleGuard - canActivate called for route:', state.url);
    console.log('RoleGuard - Required roles:', route.data?.['roles']);
    
    // التحقق من تسجيل دخول المستخدم أولاً
    if (!this.authService.isLoggedIn()) {
      console.log('RoleGuard - User not logged in, redirecting to login');
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // الحصول على الأدوار المطلوبة من بيانات المسار
    const requiredRoles = route.data?.['roles'] as string[];
    
    // إذا لم تكن هناك أدوار مطلوبة، السماح بالوصول
    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('RoleGuard - No roles required, allowing access');
      return true;
    }

    // التحقق من وجود أي من الأدوار المطلوبة
    const currentUser = this.authService.getCurrentUser();
    console.log('RoleGuard - Current user:', currentUser);
    console.log('RoleGuard - User roles:', currentUser?.roles);
    
    if (this.authService.hasAnyRole(requiredRoles)) {
      console.log('RoleGuard - User has required role, allowing access');
      return true;
    }

    console.log('RoleGuard - User does not have required role, redirecting to access denied');
    // إعادة توجيه إلى صفحة عدم الصلاحية
    return this.router.createUrlTree(['/access-denied']);
  }
}




