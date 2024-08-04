import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideLoading() {
    this.loadingSubject.next(false);
  }

  get isLoading(): Observable<boolean> {
    return this.loading$;
  }
}
