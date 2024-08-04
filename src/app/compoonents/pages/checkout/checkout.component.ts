import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { OrderService } from './../../../services/orderService/order.service';
import { GlobleService } from './../../../services/globle/globle.service';
import { CheckoutService } from './../../../services/checkout-service/checkout.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutItemQuantity: number = 1;
  LatLngLocation = {};
  showMap: boolean = false;
  constructor(
    private CheckoutService: CheckoutService,
    public GlobleService: GlobleService,
    private OrderService: OrderService,
    private ToastrService: ToastrService,
    private Router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.CheckoutService.getCheckout().subscribe({
      next: (res: any) => {
        console.log(res);
        this.GlobleService.checkoutData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCartItem(item: any, event: any) {
    console.log(item);
    this.CheckoutService.updateCheckoutQuantity(
      item.foodId,
      event.target.value
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.GlobleService.checkoutData = res.data;
        console.log(this.GlobleService.checkoutData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  increaseQuantity(item: any) {
    item.quantity++;
    console.log(item);
    this.CheckoutService.updateCheckoutQuantity(
      item.foodId,
      item.quantity
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.GlobleService.checkoutData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      console.log(item);
      this.CheckoutService.updateCheckoutQuantity(
        item.foodId,
        item.quantity
      ).subscribe({
        next: (res: any) => {
          console.log(res);
          this.GlobleService.checkoutData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  createOrder() {
    console.log(this.GlobleService.checkoutData);
    this.GlobleService.adressLatLng$.subscribe({
      next: (res: any) => {
        console.log(res);
        this.LatLngLocation = res;
        console.log(typeof this.LatLngLocation);
        if (!Object.keys(this.LatLngLocation).length) {
          window.alert(
            'Please select your address from the map to proceed with the order'
          );
        } else {
          this.LatLngLocation = {
            lat: res.lat || res.LatLng.lat,
            lng: res.lng || res.LatLng.lng,
          };
          console.log(this.LatLngLocation);
          this.showMap = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    console.log(
      this.GlobleService.checkoutData.deliveryCost +
        this.GlobleService.checkoutData.allTotalPrice
    );
    if (this.showMap) {
      console.log(this.GlobleService.checkoutData);
      const orderData = {
        AllTotalPrice:
          this.GlobleService.checkoutData.allTotalPrice +
          this.GlobleService.checkoutData.deliveryCost,
        addressLatLng: this.LatLngLocation,
        order: [{}],
      };
      console.log(orderData);
      console.log(this.GlobleService.checkoutData.cartItems);
      orderData.order = [];
      this.GlobleService.checkoutData.cartItems.forEach((ele: any) => {
        orderData.order.push({
          foodId: ele.foodId,
          quantity: ele.quantity,
          totalPrice: ele.totalPrice,
          foodImage: ele.foodImage,
        });
      });

      console.log(orderData);

      this.OrderService.createOrder(orderData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.Router.navigate(['/payment']);
          this.ToastrService.success(
            'Your order has been placed successfully',
            'Go to Payment'
          );
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.massage);
        },
      });
    }
  }
}
