export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api',
  appName: 'Meter System',
  appVersion: '1.0.0',
  defaultLanguage: 'ar',
  supportedLanguages: ['ar', 'en'],
  defaultPageSize: 20,
  maxPageSize: 100,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  refreshTokenInterval: 5 * 60 * 1000, // 5 minutes
  enableDebug: false,
  enableLogging: false,
  enableAnalytics: true,
  enableNotifications: true,
  enableRealTimeUpdates: true,
  chartColors: {
    primary: '#6366f1',
    secondary: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  features: {
    darkMode: true,
    rtl: true,
    responsive: true,
    animations: true,
    search: true,
    filters: true,
    export: true,
    import: true,
    bulkActions: true,
    realTime: true
  }
};
