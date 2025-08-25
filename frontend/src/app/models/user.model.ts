import { BaseEntity } from './common.model';

/**
 * نماذج المستخدم
 */

// أدوار المستخدم
export enum UserRoles {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User'
}

// حالة المستخدم
export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Suspended = 'Suspended'
}

// المستخدم الأساسي
export interface User extends BaseEntity {
  email: string;
  name?: string;
  nationalId?: string;
  roles: UserRoles[];
  status: UserStatus;
  avatar?: string;
  lastLoginAt?: string;
  emailVerifiedAt?: string;
  phoneNumber?: string;
  address?: string;
  preferences: UserPreferences;
}

// DTO المستخدم
export interface UserDto {
  id: string;
  email: string;
  name?: string;
  nationalId?: string;
  roles: string[];
  status: string;
  avatar?: string;
  lastLoginAt?: string;
  emailVerifiedAt?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// تفضيلات المستخدم
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'ar' | 'en';
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
}

// تفضيلات الإشعارات
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    newCustomer: boolean;
    meterReading: boolean;
    recharge: boolean;
    systemUpdates: boolean;
    security: boolean;
  };
}

// تفضيلات لوحة التحكم
export interface DashboardPreferences {
  layout: 'default' | 'compact' | 'detailed';
  widgets: string[];
  refreshInterval: number;
}

// طلب تسجيل الدخول
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// طلب التسجيل
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  nationalId: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
}

// استجابة المصادقة
export interface AuthResponse {
  data: {
    token: string;
    refreshToken?: string;
    user: UserDto;
    expiresIn: number;
  };
  message: string;
  success: boolean;
}

// طلب تجديد الرمز المميز
export interface RefreshTokenRequest {
  refreshToken: string;
}

// طلب نسيان كلمة المرور
export interface ForgotPasswordRequest {
  email: string;
}

// طلب إعادة تعيين كلمة المرور
export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// طلب تغيير كلمة المرور
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// طلب إنشاء مستخدم
export interface CreateUserRequest {
  email: string;
  password: string;
  name?: string;
  nationalId?: string;
  roles: string[];
  phoneNumber?: string;
  address?: string;
}

// طلب تحديث المستخدم
export interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  address?: string;
  roles?: string[];
  status?: string;
}

// طلب تحديث الملف الشخصي
export interface UpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
}

// طلب تحديث التفضيلات
export interface UpdatePreferencesRequest {
  preferences: Partial<UserPreferences>;
}

// المستخدم المعلق
export interface PendingUser {
  id: string;
  email: string;
  name?: string;
  nationalId?: string;
  createdAt: string;
  requestedRoles: string[];
}

// DTO المستخدم المعلق
export interface PendingUserDto {
  id: string;
  email: string;
  name?: string;
  nationalId?: string;
  createdAt: string;
  requestedRoles: string[];
}

// طلب تأكيد البريد الإلكتروني
export interface ConfirmEmailRequest {
  email: string;
  roles?: string[];
}

// جلسة المستخدم
export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}

// إحصائيات المستخدم
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  suspendedUsers: number;
  newUsersThisMonth: number;
  usersByRole: { [role: string]: number };
  recentLogins: RecentLogin[];
}

// تسجيل دخول حديث
export interface RecentLogin {
  userId: string;
  userName: string;
  email: string;
  loginAt: string;
  ipAddress?: string;
}

// سجل نشاط المستخدم
export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  metadata?: { [key: string]: any };
}

// إعدادات الأمان
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
}

// معلومات الجهاز
export interface DeviceInfo {
  id: string;
  userId: string;
  deviceName: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  platform: string;
  browser: string;
  lastUsed: string;
  isActive: boolean;
}





