import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000/api/order';

  constructor(private http: HttpClient) {}
  createOrder(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, body);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOrder`);
  }
  pay(body: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/pay`, body);
  }
  createPayment(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/stripePayment`, body);
  }
  trackOrder(orderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/track/${orderId}`);
  }
}
