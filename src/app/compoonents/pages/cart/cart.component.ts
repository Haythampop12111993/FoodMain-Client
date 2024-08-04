import { CartService } from './../../../services/cart-services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { GlobleService } from './../../../services/globle/globle.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CheckoutService } from '../../../services/checkout-service/checkout.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isRemoved: boolean = false;
  foodId: string = '';
  constructor(
    public GlobleService: GlobleService,
    private Router: Router,
    private ToastrService: ToastrService,
    private CartService: CartService,
    private CheckoutService: CheckoutService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('here');
    this.GlobleService.showCart = false;
    const token = localStorage.getItem('userToken');
    if (token) {
      this.CartService.getCartItems().subscribe({
        next: (res: any) => {
          this.GlobleService.cartItem = res.data.food;
          console.log(res.data.food);
          this.GlobleService.cartItemsNumber = res.data.food.length;
          this.GlobleService.showCart = false;
          if (this.GlobleService.cartItem.length == 0) {
            this.ToastrService.info('Your cart is empty');
            this.GlobleService.showCart = false;
          } else {
            this.ToastrService.success('Your cart is loaded');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.GlobleService.showCart = false;
        },
      });
    }
  }
  closeCart() {
    this.GlobleService.showCart = false;
  }
  removeItem(item: any) {
    console.log(item);
    this.foodId = item.foodId._id || item.foodId;
    console.log(this.foodId);
    this.isRemoved = true;
    this.CartService.removeFromCart(this.foodId).subscribe({
      next: (res: any) => {
        // this.GlobleService.cartItem = this.GlobleService.cartItem.filter((e) => {
        //   return e.id != item.id;
        // });
        console.log(res);
        this.GlobleService.cartItem = res.data.food;
        this.GlobleService.cartItemsNumber = this.GlobleService.cartItem.length;
        this.ToastrService.info('Item removed from cart');
        if (this.GlobleService.cartItem.length == 0) {
          this.ToastrService.info('Your cart is empty');
          this.GlobleService.showCart = false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.ToastrService.error('Item removed from cart');
      },
      complete: () => {
        this.isRemoved = false;
      },
    });
    // this.GlobleService.cartItem = this.GlobleService.cartItem.filter((e) => {
    //   return e.id != item.id;
    // });
    // this.GlobleService.cartItemsNumber = this.GlobleService.cartItem.length;
    // this.ToastrService.info('Item removed from cart');
    // console.log(this.GlobleService.cartItem);
  }
  checkout() {
    console.log(this.GlobleService.cartItem);
    this.CheckoutService.checkout(this.GlobleService.cartItem).subscribe({
      next: (res: any) => {
        console.log(res);
        this.GlobleService.isCheckout = true;
        this.CartService.deleteUserCart().subscribe({
          next: (res: any) => {
            console.log(res);
            this.Router.navigateByUrl('/checkout');
            this.GlobleService.cartItemsNumber = 0;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
