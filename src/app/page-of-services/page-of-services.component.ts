import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/service';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-of-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-of-services.component.html',
  styleUrl: './page-of-services.component.css'
})
export class PageOfServicesComponent {
  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private platform: Platform,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
