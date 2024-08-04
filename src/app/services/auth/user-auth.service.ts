import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../interfaces/register/register';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  baseUrl = 'http://localhost:3000/api/user/';
  constructor(private http: HttpClient) {}
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user);
  }
  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, user);
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}getUser`);
  }
  logout(): Observable<any> {
    return this.http.delete(`${this.baseUrl}logout`);
  }
}
