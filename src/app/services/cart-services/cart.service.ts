import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = 'http://localhost:3000/api/cart';
  constructor(private http: HttpClient) {}

  addToCart(foodId: string, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/addToCart`, {
      foodId,
      quantity,
    });
  }

  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.cartUrl}/getCart`);
  }

  removeFromCart(foodId: string): Observable<any> {
    return this.http.delete<any>(`${this.cartUrl}/deleteCartItem/${foodId}`);
  }
  deleteUserCart(): Observable<any> {
    return this.http.delete(`${this.cartUrl}/deleteCart`);
  }
}
