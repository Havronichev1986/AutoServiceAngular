import { Component } from '@angular/core';
import { AuthService } from '../service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService
      .register({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Регистрация успешна', response);
        },
        error: (err) => {
          console.error('Ошибка регистрации', err);
        },
      });
  }
}
