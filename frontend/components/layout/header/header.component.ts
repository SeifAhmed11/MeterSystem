import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <!-- Left Section -->
      <div class="header-left">
        <div class="breadcrumb">
          <span class="breadcrumb-item">لوحة التحكم</span>
          <i class="fas fa-chevron-left"></i>
          <span class="breadcrumb-item active">نظرة عامة</span>
        </div>
      </div>

      <!-- Center Section -->
      <div class="header-center">
        <div class="search-container">
          <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="البحث في النظام..."
              class="search-input"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
            />
            <button class="search-clear" *ngIf="searchQuery" (click)="clearSearch()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="search-suggestions" *ngIf="showSuggestions && searchQuery">
            <div class="suggestion-item" *ngFor="let suggestion of searchSuggestions">
              <i [class]="suggestion.icon"></i>
              <span>{{ suggestion.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Notifications -->
        <div class="notification-dropdown">
          <button class="notification-btn" (click)="toggleNotifications()">
            <i class="fas fa-bell"></i>
            <span class="notification-badge" *ngIf="unreadNotifications > 0">
              {{ unreadNotifications }}
            </span>
          </button>
          
          <div class="notification-panel" *ngIf="showNotifications">
            <div class="notification-header">
              <h4>الإشعارات</h4>
              <button class="mark-all-read" (click)="markAllAsRead()">
                تحديد الكل كمقروء
              </button>
            </div>
            
            <div class="notification-list">
              <div 
                class="notification-item" 
                *ngFor="let notification of notifications"
                [class.unread]="!notification.read"
                (click)="markAsRead(notification.id)"
              >
                <div class="notification-icon" [ngClass]="notification.type">
                  <i [class]="getNotificationIcon(notification.type)"></i>
                </div>
                <div class="notification-content">
                  <div class="notification-title">{{ notification.title }}</div>
                  <div class="notification-message">{{ notification.message }}</div>
                  <div class="notification-time">{{ notification.time }}</div>
                </div>
                <div class="notification-status" *ngIf="!notification.read"></div>
              </div>
            </div>
            
            <div class="notification-footer">
              <a href="#" class="view-all">عرض جميع الإشعارات</a>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="message-dropdown">
          <button class="message-btn" (click)="toggleMessages()">
            <i class="fas fa-envelope"></i>
            <span class="message-badge" *ngIf="unreadMessages > 0">
              {{ unreadMessages }}
            </span>
          </button>
          
          <div class="message-panel" *ngIf="showMessages">
            <div class="message-header">
              <h4>الرسائل</h4>
            </div>
            
            <div class="message-list">
              <div 
                class="message-item" 
                *ngFor="let message of messages"
                [class.unread]="!message.read"
                (click)="markMessageAsRead(message.id)"
              >
                <div class="message-avatar">
                  <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                  <div class="message-sender">{{ message.sender }}</div>
                  <div class="message-preview">{{ message.preview }}</div>
                  <div class="message-time">{{ message.time }}</div>
                </div>
                <div class="message-status" *ngIf="!message.read"></div>
              </div>
            </div>
            
            <div class="message-footer">
              <a href="#" class="view-all">عرض جميع الرسائل</a>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="user-dropdown">
          <button class="user-btn" (click)="toggleUserMenu()">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
              <div class="user-name">{{ currentUser?.name || 'المستخدم' }}</div>
              <div class="user-role">{{ currentUser?.role || 'مستخدم' }}</div>
            </div>
            <i class="fas fa-chevron-down chevron"></i>
          </button>
          
          <div class="user-panel" *ngIf="showUserMenu">
            <div class="user-panel-header">
              <div class="user-avatar-large">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-details">
                <div class="user-name">{{ currentUser?.name || 'المستخدم' }}</div>
                <div class="user-email">{{ currentUser?.email || 'user@example.com' }}</div>
              </div>
            </div>
            
            <div class="user-menu-list">
              <a href="#" class="menu-item">
                <i class="fas fa-user"></i>
                <span>الملف الشخصي</span>
              </a>
              <a href="#" class="menu-item">
                <i class="fas fa-cog"></i>
                <span>الإعدادات</span>
              </a>
              <a href="#" class="menu-item">
                <i class="fas fa-question-circle"></i>
                <span>المساعدة</span>
              </a>
              <div class="menu-divider"></div>
              <a href="#" class="menu-item logout" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i>
                <span>تسجيل الخروج</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    /* Header Left */
    .header-left {
      flex: 1;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .breadcrumb-item {
      transition: var(--transition);
    }

    .breadcrumb-item.active {
      color: var(--primary-color);
      font-weight: 600;
    }

    .breadcrumb i {
      font-size: 0.75rem;
      opacity: 0.6;
    }

    /* Header Center */
    .header-center {
      flex: 2;
      display: flex;
      justify-content: center;
    }

    .search-container {
      position: relative;
      width: 100%;
      max-width: 500px;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      right: 1rem;
      color: var(--text-muted);
      z-index: 2;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 3rem 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      background: var(--bg-secondary);
      transition: var(--transition);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
      background: white;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .search-clear {
      position: absolute;
      left: 1rem;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 50%;
      transition: var(--transition);
    }

    .search-clear:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      margin-top: 0.5rem;
      z-index: 1000;
      max-height: 300px;
      overflow-y: auto;
    }

    .suggestion-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .suggestion-item:hover {
      background: var(--bg-secondary);
    }

    .suggestion-item i {
      color: var(--primary-color);
      width: 16px;
    }

    /* Header Right */
    .header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
    }

    /* Notification Dropdown */
    .notification-dropdown {
      position: relative;
    }

    .notification-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-secondary);
      position: relative;
    }

    .notification-btn:hover {
      background: var(--bg-tertiary);
      color: var(--primary-color);
      transform: translateY(-2px);
    }

    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--error-color);
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      font-weight: 600;
      min-width: 20px;
      text-align: center;
    }

    .notification-panel {
      position: absolute;
      top: 100%;
      left: -300px;
      width: 350px;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-xl);
      margin-top: 0.5rem;
      z-index: 1000;
    }

    .notification-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .notification-header h4 {
      margin: 0;
      color: var(--text-primary);
    }

    .mark-all-read {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 0.875rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .mark-all-read:hover {
      text-decoration: underline;
    }

    .notification-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      cursor: pointer;
      transition: var(--transition);
      border-bottom: 1px solid var(--border-light);
    }

    .notification-item:hover {
      background: var(--bg-secondary);
    }

    .notification-item.unread {
      background: rgba(99, 102, 241, 0.05);
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .notification-icon.info { background: var(--gradient-info); }
    .notification-icon.success { background: var(--gradient-success); }
    .notification-icon.warning { background: var(--gradient-warning); }
    .notification-icon.error { background: var(--gradient-error); }

    .notification-content {
      flex: 1;
    }

    .notification-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .notification-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .notification-time {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    .notification-status {
      width: 8px;
      height: 8px;
      background: var(--primary-color);
      border-radius: 50%;
      margin-top: 0.5rem;
    }

    .notification-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
      text-align: center;
    }

    .view-all {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
    }

    .view-all:hover {
      text-decoration: underline;
    }

    /* Message Dropdown */
    .message-dropdown {
      position: relative;
    }

    .message-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-secondary);
      position: relative;
    }

    .message-btn:hover {
      background: var(--bg-tertiary);
      color: var(--primary-color);
      transform: translateY(-2px);
    }

    .message-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--warning-color);
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      font-weight: 600;
      min-width: 20px;
      text-align: center;
    }

    .message-panel {
      position: absolute;
      top: 100%;
      left: -300px;
      width: 350px;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-xl);
      margin-top: 0.5rem;
      z-index: 1000;
    }

    .message-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .message-header h4 {
      margin: 0;
      color: var(--text-primary);
    }

    .message-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .message-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      cursor: pointer;
      transition: var(--transition);
      border-bottom: 1px solid var(--border-light);
    }

    .message-item:hover {
      background: var(--bg-secondary);
    }

    .message-item.unread {
      background: rgba(245, 158, 11, 0.05);
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      background: var(--gradient-secondary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .message-content {
      flex: 1;
    }

    .message-sender {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .message-preview {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .message-time {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    .message-status {
      width: 8px;
      height: 8px;
      background: var(--warning-color);
      border-radius: 50%;
      margin-top: 0.5rem;
    }

    .message-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
      text-align: center;
    }

    /* User Dropdown */
    .user-dropdown {
      position: relative;
    }

    .user-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-primary);
    }

    .user-btn:hover {
      background: var(--bg-tertiary);
      transform: translateY(-2px);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .user-info {
      text-align: right;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .chevron {
      color: var(--text-muted);
      transition: var(--transition);
    }

    .user-btn:hover .chevron {
      transform: rotate(180deg);
    }

    .user-panel {
      position: absolute;
      top: 100%;
      left: -200px;
      width: 280px;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-xl);
      margin-top: 0.5rem;
      z-index: 1000;
    }

    .user-panel-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      text-align: center;
    }

    .user-avatar-large {
      width: 60px;
      height: 60px;
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
    }

    .user-details .user-name {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .user-email {
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .user-menu-list {
      padding: 1rem 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: var(--text-primary);
      text-decoration: none;
      transition: var(--transition);
    }

    .menu-item:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
    }

    .menu-item.logout {
      color: var(--error-color);
    }

    .menu-item.logout:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    .menu-item i {
      width: 16px;
      text-align: center;
    }

    .menu-divider {
      height: 1px;
      background: var(--border-color);
      margin: 0.5rem 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .header-left,
      .header-center,
      .header-right {
        flex: none;
        width: 100%;
      }

      .header-center {
        order: 1;
      }

      .header-left {
        order: 2;
      }

      .header-right {
        order: 3;
        justify-content: center;
      }

      .search-container {
        max-width: none;
      }

      .notification-panel,
      .message-panel,
      .user-panel {
        left: -150px;
        width: 300px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  showSuggestions = false;
  showNotifications = false;
  showMessages = false;
  showUserMenu = false;
  currentUser: any = null;

  unreadNotifications = 3;
  unreadMessages = 2;

  searchSuggestions = [
    { icon: 'fas fa-users', text: 'العملاء' },
    { icon: 'fas fa-bolt', text: 'العدادات' },
    { icon: 'fas fa-file-contract', text: 'العقود' },
    { icon: 'fas fa-credit-card', text: 'إعادة الشحن' }
  ];

  notifications = [
    {
      id: 1,
      type: 'info',
      title: 'عميل جديد',
      message: 'تم إضافة عميل جديد للنظام',
      time: 'منذ 5 دقائق',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'تم إعادة الشحن',
      message: 'تم إعادة شحن العداد بنجاح',
      time: 'منذ 15 دقيقة',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'تنبيه',
      message: 'عداد يحتاج إلى صيانة',
      time: 'منذ ساعة',
      read: false
    }
  ];

  messages = [
    {
      id: 1,
      sender: 'أحمد محمد',
      preview: 'مرحباً، أحتاج مساعدة في...',
      time: 'منذ 10 دقائق',
      read: false
    },
    {
      id: 2,
      sender: 'فاطمة علي',
      preview: 'شكراً لك على المساعدة',
      time: 'منذ ساعة',
      read: false
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Get current user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      if (!(event.target as Element).closest('.notification-dropdown')) {
        this.showNotifications = false;
      }
      if (!(event.target as Element).closest('.message-dropdown')) {
        this.showMessages = false;
      }
      if (!(event.target as Element).closest('.user-dropdown')) {
        this.showUserMenu = false;
      }
    });
  }

  onSearch(): void {
    this.showSuggestions = this.searchQuery.length > 0;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.showSuggestions = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showMessages = false;
    this.showUserMenu = false;
  }

  toggleMessages(): void {
    this.showMessages = !this.showMessages;
    this.showNotifications = false;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    this.showMessages = false;
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.unreadNotifications = Math.max(0, this.unreadNotifications - 1);
    }
  }

  markMessageAsRead(messageId: number): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      this.unreadMessages = Math.max(0, this.unreadMessages - 1);
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => notification.read = true);
    this.unreadNotifications = 0;
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      info: 'fas fa-info-circle',
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle'
    };
    return icons[type] || 'fas fa-bell';
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login (you'll need to inject Router)
    console.log('Logging out...');
  }
}





