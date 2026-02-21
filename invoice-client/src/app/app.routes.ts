import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { InvoiceListComponent } from './components/invoice-list/invoice-list';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'invoices', component: InvoiceListComponent, canActivate: [authGuard] },
    { path: 'invoices/new', component: InvoiceFormComponent, canActivate: [authGuard] },
    { path: 'invoices/edit/:id', component: InvoiceFormComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];
