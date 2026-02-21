import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/auth';

    // Use Signal for reactive state in Angular 21 (Zoneless compatible)
    loggedIn = signal<boolean>(this.hasToken());

    constructor(private http: HttpClient) { }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userName', response.userName);
                localStorage.setItem('userId', response.userId.toString());
                this.loggedIn.set(true);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        this.loggedIn.set(false);
    }

    hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserName(): string | null {
        return localStorage.getItem('userName');
    }
}
