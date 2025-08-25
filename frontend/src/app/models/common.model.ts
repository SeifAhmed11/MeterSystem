/**
 * نماذج مشتركة للتطبيق
 */

// استجابة API الأساسية
export interface BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: { [key: string]: string[] };
}

// استجابة مرقمة
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  message: string;
  success: boolean;
}

// معلومات الترقيم
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// معاملات الاستعلام
export interface QueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// خيارات القائمة المنسدلة
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// معلومات الملف
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

// حالة التحميل
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  message?: string;
}

// إعدادات الجدول
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions';
}

// إجراءات الجدول
export interface TableAction {
  key: string;
  label: string;
  icon: string;
  color?: string;
  disabled?: (item: any) => boolean;
  visible?: (item: any) => boolean;
}

// خيارات التصفية
export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number';
  options?: SelectOption[];
  placeholder?: string;
}

// نتيجة التصفية
export interface FilterResult {
  [key: string]: any;
}

// معلومات المستخدم الأساسية
export interface BaseUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// الكيان الأساسي
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
}

// إعدادات التطبيق
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  pageSize: number;
  notifications: boolean;
  autoSave: boolean;
}

// إشعار
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actions?: NotificationAction[];
}

// إجراء الإشعار
export interface NotificationAction {
  label: string;
  action: string;
  primary?: boolean;
}

// رسالة
export interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  preview: string;
  time: string;
  read: boolean;
}

// إحصائية
export interface Statistic {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: string;
  format?: 'number' | 'currency' | 'percentage';
}

// نقطة بيانات الرسم البياني
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// بيانات الرسم البياني
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// مجموعة بيانات الرسم البياني
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

// خيارات الرسم البياني
export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
  scales?: {
    x?: {
      display?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
    y?: {
      display?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
  };
}

// حالة النموذج
export interface FormState {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  errors: { [key: string]: string };
}

// خيارات التصدير
export interface ExportOptions {
  format: 'excel' | 'pdf' | 'csv';
  filename?: string;
  includeHeaders?: boolean;
  columns?: string[];
}

// نتيجة التصدير
export interface ExportResult {
  success: boolean;
  filename: string;
  url?: string;
  message?: string;
}





