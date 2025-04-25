// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import jwtDecode from 'jwt-decode';

// interface JwtPayload {
//   roles: string[];
// }

// interface LoginRequest {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
// }

// @Injectable({
//   providedIn: 'root', // 👈 делает сервис доступным везде
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/api/auth'; // адаптируй под свой backend

//   constructor(private http: HttpClient) {}

//   login(data: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
//   }

//   register(data: LoginRequest): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  roles: string[];
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getRolesFromToken(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: JwtPayload = jwtDecode(token);
        console.log('JWT payload:', decoded); // для отладки
        return decoded.roles || [];
      }
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getRolesFromToken().includes(role);
  }
}