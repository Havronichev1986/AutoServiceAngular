import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders/create';

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
}