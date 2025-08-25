import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  private nextId = 1;

  constructor() {}

  showSuccess(message: string, duration: number = 5000): void {
    this.show(message, 'success', duration);
  }

  showError(message: string, duration: number = 7000): void {
    this.show(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 6000): void {
    this.show(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 5000): void {
    this.show(message, 'info', duration);
  }

  private show(message: string, type: ToastMessage['type'], duration: number): void {
    const toast: ToastMessage = {
      id: this.nextId++,
      message,
      type,
      duration
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, toast]);

    // Auto remove after duration
    setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  }

  remove(id: number): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next(currentMessages.filter(msg => msg.id !== id));
  }

  clear(): void {
    this.messagesSubject.next([]);
  }
}


