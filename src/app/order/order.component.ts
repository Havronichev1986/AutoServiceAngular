import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderFormComponent {
  orderForm = this.fb.group({
    brand: ['', Validators.required],
    vinNumber: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    status: ['Запланировано', Validators.required]
  });

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  submitOrder() {
    if (this.orderForm.invalid) return;
  
    const token = localStorage.getItem('token'); 
  
    this.http.post(
      'http://localhost:8080/api/orders',
      this.orderForm.value,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        this.successMessage = 'Заявка успешно создана!';
        this.errorMessage = '';
        this.orderForm.reset({ status: 'Запланировано' });
      },
      error: err => {
        this.errorMessage = 'Ошибка при создании заявки.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}