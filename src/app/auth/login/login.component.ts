import { Component } from '@angular/core';
import { AuthService } from '../service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Ошибка: Все поля должны быть заполнены');
      console.error('Ошибка: Все поля должны быть заполнены');
      return;
    }
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Успешный вход!', response);
          alert('Добро пожаловать - ' + this.email);
          if(response)this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Не верный email или passwor');
          console.error('Ошибка входа', err);
        },
      });
    
  }
}
