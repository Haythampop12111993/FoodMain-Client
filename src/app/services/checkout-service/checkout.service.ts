import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = 'http://localhost:3000/api/checkout';

  constructor(private http: HttpClient) {}

  checkout(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/createCheckout', data);
  }
  getCheckout(): Observable<any> {
    return this.http.get(this.baseUrl + '/getCheckout');
  }
  updateCheckoutQuantity(foodId: string, quantity: number): Observable<any> {
    return this.http.put(this.baseUrl + '/updateCheckoutQuantity', {
      foodId,
      quantity,
    });
  }

  deleteCheckout(): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteCheckout');
  }
}
