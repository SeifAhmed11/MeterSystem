import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast"
        [ngClass]="toast.type"

      >
        <div class="toast-content">
          <i [class]="getIcon(toast.type)"></i>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" (click)="removeToast(toast.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      padding: 16px 20px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      color: white;
      font-weight: 500;
      animation: slideInRight 0.3s ease;
    }

    .toast.success {
      background: var(--success-color);
    }

    .toast.error {
      background: var(--error-color);
    }

    .toast.warning {
      background: var(--warning-color);
    }

    .toast.info {
      background: var(--info-color);
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .toast-content i {
      font-size: 18px;
    }

    .toast-message {
      font-size: 14px;
    }

    .toast-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    .toast-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: any[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.messages$.subscribe(messages => {
      this.toasts = messages;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  }

  removeToast(id: number): void {
    this.toastService.remove(id);
  }
}
