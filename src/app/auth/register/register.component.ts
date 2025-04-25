import { Component } from '@angular/core';
import { AuthService } from '../service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      alert('Ошибка: Неверный формат email');
      console.error('Ошибка: Неверный формат email');
      return;
    }
    if (!this.email || !this.password) {
      alert('Ошибка: Все поля должны быть заполнены');
      console.error('Ошибка: Все поля должны быть заполнены');
      return;
    }
    this.authService
      .register({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          alert('Регистрация успешна');
          console.log('Регистрация успешна', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(
            'Ошибка регестрации, пользователь с именем ' +
              this.email +
              ' уже существует!'
          ),
            console.error('Ошибка регистрации', err);
        },
      });
  }
}
