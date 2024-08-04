import { Router } from '@angular/router';
import { OrderService } from './../../../services/orderService/order.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { PaypalButtonComponent } from '../paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MapComponent, PaypalButtonComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  userOrderData: any = {};
  userName: string = '';
  userAddress = '';
  constructor(private OrderService: OrderService, private Router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userAddress.toUpperCase;
    this.OrderService.getOrders().subscribe({
      next: (res: any) => {
        this.userOrderData = res.data;
        this.userName = this.userOrderData.userId.name;
        this.userAddress = `${this.userOrderData.userId.address[0].street} - ${this.userOrderData.userId.address[0].city} - ${this.userOrderData.userId.address[0].country}`;
        console.log(this.userOrderData, 'orderData');
      },
      error: (err: any) => {
        console.log(err);
        this.Router.navigate(['/checkout']);
      },
    });
  }
}
