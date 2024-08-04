import { Injectable } from '@angular/core';
import { FoodList } from '../../interfaces/food-list';
import { sample_foods } from '../../../test-data/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // selectedTag: any = 'All';
  // page: number = 1;
  // search: string = '';

  private apiUrl = 'http://localhost:3000/api/food/';
  constructor(private http: HttpClient) {}
  getAllFood(tag: string, page: number, search: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}searchFoodWithTag/${tag}?page=${page}&search=${search}`
    );
  }
}
