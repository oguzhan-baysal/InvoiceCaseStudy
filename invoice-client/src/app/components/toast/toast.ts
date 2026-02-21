import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
            @for (toast of notificationService.toasts(); track toast.id) {
            <div class="toast show align-items-center border-0 mb-2 fade-in"
                [class.text-bg-success]="toast.type === 'success'"
                [class.text-bg-danger]="toast.type === 'error'"
                [class.text-bg-info]="toast.type === 'info'"
                [class.text-bg-warning]="toast.type === 'warning'"
                role="alert">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center gap-2">
                        <i class="bi" [class]="toast.icon" style="font-size: 1.1rem;"></i>
                        {{ toast.message }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto"
                        (click)="notificationService.remove(toast.id)"></button>
                </div>
            </div>
            }
        </div>
    `,
    styles: [`
        .toast {
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            min-width: 300px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `]
})
export class ToastComponent {
    constructor(public notificationService: NotificationService) { }
}
