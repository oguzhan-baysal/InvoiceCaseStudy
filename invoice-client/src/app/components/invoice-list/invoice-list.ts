import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { PdfService } from '../../services/pdf.service';
import { NotificationService } from '../../services/notification.service';
import { Invoice } from '../../models/models';

@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './invoice-list.html',
    styleUrl: './invoice-list.css'
})
export class InvoiceListComponent implements OnInit {
    invoices: Invoice[] = [];
    startDate: string = '';
    endDate: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';
    deleteInvoiceId: number | null = null;
    showDeleteModal: boolean = false;

    constructor(
        private invoiceService: InvoiceService,
        private pdfService: PdfService,
        private notify: NotificationService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadInvoices();
    }

    loadInvoices(): void {
        this.isLoading = true;
        this.errorMessage = '';
        this.cdr.detectChanges();

        this.invoiceService.getInvoices(this.startDate, this.endDate).subscribe({
            next: (data) => {
                this.invoices = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Faturalar yüklenirken hata oluştu.';
                this.notify.error('Faturalar yüklenirken hata oluştu.');
                console.error(err);
                this.cdr.detectChanges();
            }
        });
    }

    onFilter(): void {
        this.loadInvoices();
    }

    onClearFilter(): void {
        this.startDate = '';
        this.endDate = '';
        this.loadInvoices();
    }

    onAdd(): void {
        this.router.navigate(['/invoices/new']);
    }

    onEdit(invoice: Invoice): void {
        this.router.navigate(['/invoices/edit', invoice.invoiceId]);
    }

    onDeleteClick(invoiceId: number): void {
        this.deleteInvoiceId = invoiceId;
        this.showDeleteModal = true;
        this.cdr.detectChanges();
    }

    onDeleteConfirm(): void {
        if (this.deleteInvoiceId === null) return;

        this.invoiceService.deleteInvoice(this.deleteInvoiceId).subscribe({
            next: () => {
                this.notify.success('Fatura başarıyla silindi.');
                this.showDeleteModal = false;
                this.deleteInvoiceId = null;
                this.cdr.detectChanges();
                this.loadInvoices();
            },
            error: (err) => {
                this.notify.error('Fatura silinirken hata oluştu.');
                this.showDeleteModal = false;
                console.error(err);
                this.cdr.detectChanges();
            }
        });
    }

    onDeleteCancel(): void {
        this.showDeleteModal = false;
        this.deleteInvoiceId = null;
        this.cdr.detectChanges();
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

    async onExportPdf(invoice: Invoice): Promise<void> {
        await this.pdfService.exportInvoicePdf(invoice);
    }
}
