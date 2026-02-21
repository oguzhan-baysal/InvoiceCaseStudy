import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl = '/api/customer';

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiUrl}/list`);
    }
}
