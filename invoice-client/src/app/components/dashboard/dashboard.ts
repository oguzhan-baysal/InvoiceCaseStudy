import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats | null = null;
    isLoading: boolean = true;

    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.isLoading = true;
        this.cdr.detectChanges();

        this.dashboardService.getStats().subscribe({
            next: (data) => {
                this.stats = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Dashboard yüklenemedi:', err);
                this.cdr.detectChanges();
            }
        });
    }

    goToInvoices(): void {
        this.router.navigate(['/invoices']);
    }

    goToNewInvoice(): void {
        this.router.navigate(['/invoices/new']);
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('tr-TR');
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    }
}
