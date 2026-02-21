import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { LoginRequest } from '../../models/models';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent {
    userName: string = '';
    password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private notify: NotificationService,
        private cdr: ChangeDetectorRef
    ) {
        if (this.authService.hasToken()) {
            this.router.navigate(['/dashboard']);
        }
    }

    onLogin(): void {
        if (!this.userName || !this.password) {
            this.errorMessage = 'Kullanıcı adı ve şifre gereklidir.';
            this.cdr.detectChanges();
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.cdr.detectChanges();

        const request: LoginRequest = {
            userName: this.userName,
            password: this.password
        };

        this.authService.login(request).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.isLoading = false;
                if (err.status === 401) {
                    this.errorMessage = 'Geçersiz kullanıcı adı veya şifre.';
                    this.notify.error('Geçersiz kullanıcı adı veya şifre.');
                } else {
                    this.errorMessage = 'Sunucu hatası. Lütfen tekrar deneyin.';
                    this.notify.error('Sunucu hatası. Lütfen tekrar deneyin.');
                }
                this.cdr.detectChanges();
            }
        });
    }
}
