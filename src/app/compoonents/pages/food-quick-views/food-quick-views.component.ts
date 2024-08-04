import { Router } from '@angular/router';
import { CartService } from './../../../services/cart-services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { GlobleService } from './../../../services/globle/globle.service';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-food-quick-views',
  standalone: true,
  imports: [RatingModule, FormsModule, CommonModule],
  templateUrl: './food-quick-views.component.html',
  styleUrl: './food-quick-views.component.css',
})
export class FoodQuickViewsComponent {
  // foodQuickView: any = input();
  // @Input() foodQuickView: any = {};
  objData: any = {};
  value: number = 0;
  isAdded: boolean = false;
  constructor(
    private GlobleService: GlobleService,
    private ToastrService: ToastrService,
    private CartService: CartService,
    private Router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.objData = this.GlobleService.foodData;
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(this.foodQuickView);
  }
  closeFoodView() {
    // this.GlobleService.showFoodQuickView.next(false);
    this.GlobleService.foodShow = false;
  }
  cartName = '';
  addToCart(cartItem: any) {
    console.log(cartItem);
    const addCart: any = {
      foodId: cartItem._id,
      quantity: 1,
    };
    console.log(addCart);
    this.isAdded = true;
    this.CartService.addToCart(addCart.foodId, addCart.quantity).subscribe({
      next: (res: any) => {
        console.log(res);
        this.ToastrService.success('Item added to cart');
        this.GlobleService.cartItemsNumber = res.data.food.length;
        this.GlobleService.cartItem = res.data.food;
        this.GlobleService.foodShow = false;
        this.Router.navigate(['/home']);
      },
      error: (err: any) => {
        console.log(err);
        this.ToastrService.error('Item not added to cart');
      },
      complete: () => {
        this.isAdded = false;
      },
    });

    setTimeout(() => {
      this.isAdded = false;
    }, 1000);
    // const cartItemArray: any = this.GlobleService.cartItem;
    // let obj = cartItemArray.find((e: any) => {
    //   return e.id == addCart.id;
    // });
    // if (obj) {
    //   let objIndex = cartItemArray.indexOf(obj);
    //   cartItemArray[objIndex] = { ...obj, quantity: obj.quantity + 1 };
    //   console.log(cartItemArray);
    //   this.ToastrService.success('Item added to cart');
    //   this.GlobleService.foodShow = false;

    //   return;
    // } else {
    //   cartItemArray.push(addCart);
    //   console.log(cartItemArray);
    //   this.GlobleService.cartItemsNumber = cartItemArray.length;
    //   this.ToastrService.success('Item added to cart');
    //   this.GlobleService.foodShow = false;

    //   return;
    // }
  }
}
