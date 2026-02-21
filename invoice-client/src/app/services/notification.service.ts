import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    icon: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private counter = 0;
    toasts = signal<Toast[]>([]);

    show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
        const icons: Record<string, string> = {
            success: 'bi-check-circle-fill',
            error: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill',
            warning: 'bi-exclamation-circle-fill'
        };

        const toast: Toast = {
            id: ++this.counter,
            message,
            type,
            icon: icons[type]
        };

        this.toasts.update(current => [...current, toast]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            this.remove(toast.id);
        }, 4000);
    }

    success(message: string): void {
        this.show(message, 'success');
    }

    error(message: string): void {
        this.show(message, 'error');
    }

    remove(id: number): void {
        this.toasts.update(current => current.filter(t => t.id !== id));
    }
}
