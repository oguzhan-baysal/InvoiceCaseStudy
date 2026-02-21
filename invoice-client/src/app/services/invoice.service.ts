import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private apiUrl = '/api/invoice';

    constructor(private http: HttpClient) { }

    getInvoices(startDate?: string, endDate?: string): Observable<Invoice[]> {
        let params = new HttpParams();
        if (startDate) {
            params = params.set('startdate', startDate);
        }
        if (endDate) {
            params = params.set('enddate', endDate);
        }
        return this.http.get<Invoice[]>(`${this.apiUrl}/list`, { params });
    }

    saveInvoice(invoice: Invoice): Observable<any> {
        return this.http.post(`${this.apiUrl}/save`, invoice);
    }

    updateInvoice(invoice: Invoice): Observable<any> {
        return this.http.put(`${this.apiUrl}/update`, invoice);
    }

    deleteInvoice(invoiceId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete`, {
            body: { invoiceId }
        });
    }
}
