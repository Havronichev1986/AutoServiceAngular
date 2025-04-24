import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root', // 👈 делает сервис доступным везде
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // адаптируй под свой backend

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  register(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
