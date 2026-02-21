import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { NotificationService } from '../../services/notification.service';
import { Customer } from '../../models/models';

@Component({
    selector: 'app-customer-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './customer-list.html',
    styleUrl: './customer-list.css'
})
export class CustomerListComponent implements OnInit {
    customers: Customer[] = [];
    isLoading: boolean = false;

    // Form state
    showForm: boolean = false;
    isEditMode: boolean = false;
    formTitle: string = 'Yeni Müşteri';
    currentCustomer: Customer = this.getEmptyCustomer();

    // Delete modal
    showDeleteModal: boolean = false;
    deleteCustomerId: number | null = null;

    constructor(
        private customerService: CustomerService,
        private notify: NotificationService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadCustomers();
    }

    getEmptyCustomer(): Customer {
        return { customerId: 0, taxNumber: '', title: '', address: '', eMail: '' };
    }

    loadCustomers(): void {
        this.isLoading = true;
        this.cdr.detectChanges();

        this.customerService.getCustomers().subscribe({
            next: (data) => {
                this.customers = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.isLoading = false;
                this.notify.error('Müşteriler yüklenirken hata oluştu.');
                console.error(err);
                this.cdr.detectChanges();
            }
        });
    }

    onAdd(): void {
        this.currentCustomer = this.getEmptyCustomer();
        this.isEditMode = false;
        this.formTitle = 'Yeni Müşteri';
        this.showForm = true;
        this.cdr.detectChanges();
    }

    onEdit(customer: Customer): void {
        this.currentCustomer = { ...customer };
        this.isEditMode = true;
        this.formTitle = 'Müşteri Düzenle';
        this.showForm = true;
        this.cdr.detectChanges();
    }

    onFormCancel(): void {
        this.showForm = false;
        this.cdr.detectChanges();
    }

    onFormSave(): void {
        if (!this.currentCustomer.title || !this.currentCustomer.taxNumber) {
            this.notify.error('Vergi No ve Ünvan alanları zorunludur.');
            return;
        }

        if (this.isEditMode) {
            this.customerService.updateCustomer(this.currentCustomer).subscribe({
                next: () => {
                    this.notify.success('Müşteri başarıyla güncellendi.');
                    this.showForm = false;
                    this.loadCustomers();
                },
                error: (err) => {
                    this.notify.error('Müşteri güncellenirken hata oluştu.');
                    console.error(err);
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.customerService.saveCustomer(this.currentCustomer).subscribe({
                next: () => {
                    this.notify.success('Müşteri başarıyla kaydedildi.');
                    this.showForm = false;
                    this.loadCustomers();
                },
                error: (err) => {
                    this.notify.error('Müşteri kaydedilirken hata oluştu.');
                    console.error(err);
                    this.cdr.detectChanges();
                }
            });
        }
    }

    onDeleteClick(customerId: number): void {
        this.deleteCustomerId = customerId;
        this.showDeleteModal = true;
        this.cdr.detectChanges();
    }

    onDeleteConfirm(): void {
        if (this.deleteCustomerId === null) return;

        this.customerService.deleteCustomer(this.deleteCustomerId).subscribe({
            next: () => {
                this.notify.success('Müşteri başarıyla silindi.');
                this.showDeleteModal = false;
                this.deleteCustomerId = null;
                this.loadCustomers();
            },
            error: (err) => {
                const msg = err.error?.message || 'Müşteri silinirken hata oluştu.';
                this.notify.error(msg);
                this.showDeleteModal = false;
                console.error(err);
                this.cdr.detectChanges();
            }
        });
    }

    onDeleteCancel(): void {
        this.showDeleteModal = false;
        this.deleteCustomerId = null;
        this.cdr.detectChanges();
    }
}
