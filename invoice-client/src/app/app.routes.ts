import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { InvoiceListComponent } from './components/invoice-list/invoice-list';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form';
import { CustomerListComponent } from './components/customer-list/customer-list';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'invoices', component: InvoiceListComponent, canActivate: [authGuard] },
    { path: 'invoices/new', component: InvoiceFormComponent, canActivate: [authGuard] },
    { path: 'invoices/edit/:id', component: InvoiceFormComponent, canActivate: [authGuard] },
    { path: 'customers', component: CustomerListComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];
