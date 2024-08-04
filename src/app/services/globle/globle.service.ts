import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobleService {
  // showFoodQuickView = new BehaviorSubject<boolean>(false);
  // showFoodQuickView$ = this.showFoodQuickView.asObservable();
  foodData: object = {};
  foodShow: boolean = false;
  showCart: boolean = false;
  cartItem: any[] = [];
  cartItemsNumber: number = 0;
  isLogin: boolean = false;
  userImg: string = '';
  isCheckout: boolean = false;
  checkoutData: any = [];
  // userLocation: BehaviorSubject<any> = new BehaviorSubject<any>({});
  // userLocation$ = this.userLocation.asObservable();
  // LatLng: {} = {};
  adressLatLng: BehaviorSubject<{}> = new BehaviorSubject({});
  adressLatLng$: Observable<{}> = this.adressLatLng.asObservable();

  constructor() {}

  cartItemTotalPrice(array: any[]) {
    let totalPrice: number = 0;
    array.forEach((e) => {
      totalPrice += e.totalPrice;
    });
    return totalPrice;
  }
  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      if (!navigator.geolocation) return;
      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }
}
