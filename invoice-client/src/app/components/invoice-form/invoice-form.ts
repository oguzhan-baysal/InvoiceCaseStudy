import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CustomerService } from '../../services/customer.service';
import { Invoice, InvoiceLine, Customer } from '../../models/models';

@Component({
    selector: 'app-invoice-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './invoice-form.html',
    styleUrl: './invoice-form.css'
})
export class InvoiceFormComponent implements OnInit {
    invoice: Invoice = {
        invoiceId: 0,
        customerId: 0,
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        totalAmount: 0,
        invoiceLines: []
    };

    customers: Customer[] = [];
    isEditMode: boolean = false;
    isLoading: boolean = false;
    isSaving: boolean = false;
    errorMessage: string = '';
    pageTitle: string = 'Yeni Fatura';

    constructor(
        private invoiceService: InvoiceService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadCustomers();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.pageTitle = 'Fatura Düzenle';
            this.loadInvoice(parseInt(id));
        } else {
            this.addLine();
        }
    }

    loadCustomers(): void {
        this.customerService.getCustomers().subscribe({
            next: (data) => {
                this.customers = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Müşteriler yüklenemedi:', err);
                this.cdr.detectChanges();
            }
        });
    }

    loadInvoice(id: number): void {
        this.isLoading = true;
        this.cdr.detectChanges();

        this.invoiceService.getInvoices().subscribe({
            next: (invoices) => {
                const found = invoices.find(i => i.invoiceId === id);
                if (found) {
                    this.invoice = {
                        ...found,
                        invoiceDate: new Date(found.invoiceDate).toISOString().split('T')[0]
                    };
                } else {
                    this.errorMessage = 'Fatura bulunamadı.';
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Fatura yüklenirken hata oluştu.';
                console.error(err);
                this.cdr.detectChanges();
            }
        });
    }

    addLine(): void {
        this.invoice.invoiceLines.push({
            invoiceLineId: 0,
            invoiceId: this.invoice.invoiceId,
            itemName: '',
            quantity: 1,
            price: 0
        });
    }

    removeLine(index: number): void {
        if (this.invoice.invoiceLines.length > 1) {
            this.invoice.invoiceLines.splice(index, 1);
            this.calculateTotal();
        }
    }

    calculateTotal(): void {
        this.invoice.totalAmount = this.invoice.invoiceLines.reduce(
            (sum, line) => sum + (line.quantity * line.price), 0
        );
    }

    onLineChange(): void {
        this.calculateTotal();
    }

    onSave(): void {
        // Validation
        if (!this.invoice.customerId || this.invoice.customerId === 0) {
            this.errorMessage = 'Lütfen bir müşteri seçin.';
            return;
        }
        if (!this.invoice.invoiceNumber) {
            this.errorMessage = 'Fatura numarası gereklidir.';
            return;
        }
        if (!this.invoice.invoiceDate) {
            this.errorMessage = 'Fatura tarihi gereklidir.';
            return;
        }
        if (this.invoice.invoiceLines.length === 0) {
            this.errorMessage = 'En az bir fatura satırı gereklidir.';
            return;
        }

        const hasEmptyLine = this.invoice.invoiceLines.some(l => !l.itemName || l.quantity <= 0 || l.price <= 0);
        if (hasEmptyLine) {
            this.errorMessage = 'Tüm fatura satırlarını doldurun (ürün adı, miktar > 0, fiyat > 0).';
            return;
        }

        this.isSaving = true;
        this.errorMessage = '';
        this.calculateTotal();
        this.cdr.detectChanges();

        const saveData: Invoice = {
            ...this.invoice,
            invoiceDate: new Date(this.invoice.invoiceDate).toISOString()
        };

        if (this.isEditMode) {
            this.invoiceService.updateInvoice(saveData).subscribe({
                next: () => {
                    this.router.navigate(['/invoices']);
                },
                error: (err) => {
                    this.isSaving = false;
                    this.errorMessage = 'Fatura güncellenirken hata oluştu.';
                    console.error(err);
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.invoiceService.saveInvoice(saveData).subscribe({
                next: () => {
                    this.router.navigate(['/invoices']);
                },
                error: (err) => {
                    this.isSaving = false;
                    this.errorMessage = 'Fatura kaydedilirken hata oluştu.';
                    console.error(err);
                    this.cdr.detectChanges();
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/invoices']);
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    }
}
