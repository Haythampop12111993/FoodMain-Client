import { CommonModule } from '@angular/common';
import { OrderService } from './../../../services/orderService/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { map } from 'leaflet';

@Component({
  selector: 'app-order-track',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './order-track.component.html',
  styleUrl: './order-track.component.css',
})
export class OrderTrackComponent {
  order: any = {};
  userName: string = '';
  userAddress: string = '';
  orderCost: number = 0;
  deliveryCost: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private OrderService: OrderService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.activatedRoute.snapshot.params['id']);
    const params = this.activatedRoute.snapshot.params;
    if (!params['orderId']) return;
    this.OrderService.trackOrder(params['orderId']).subscribe({
      next: (res) => {
        console.log(res);
        this.order = res.data;
        this.userName = res.data.userId.name;
        this.userAddress = `${res.data.userId.address[0].street} - ${res.data.userId.address[0].city} - ${res.data.userId.address[0].country}`;
        this.orderCostWithOutDelvCost();
        this.deliveryCost = res.data.order.length * 3;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  orderCostWithOutDelvCost() {
    this.orderCost = 0;
    this.order.order.map((e: any) => {
      this.orderCost += e.totalPrice;
    });
  }
}
