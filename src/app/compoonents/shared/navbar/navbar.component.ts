import { UserAuthService } from './../../../services/auth/user-auth.service';
import { GlobleService } from './../../../services/globle/globle.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../../../services/checkout-service/checkout.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showMenu: boolean = true;
  showUserMenu: boolean = true;
  isCheckout: boolean = true;
  constructor(
    public GlobleService: GlobleService,
    private ToastrService: ToastrService,
    private UserAuthService: UserAuthService,
    private CheckoutService: CheckoutService,
    private Router: Router
  ) {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      this.GlobleService.isLogin = true;
      this.UserAuthService.getUser().subscribe((res) => {
        console.log(res);
        this.GlobleService.userImg = res.data.image;
      });
      this.CheckoutService.getCheckout().subscribe({
        next: (res: any) => {
          console.log(res);
          this.GlobleService.checkoutData = res.data;
          this.GlobleService.isCheckout = true;
          console.log(this.GlobleService.checkoutData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    console.log(this.GlobleService.userImg);
  }
  clickCart() {
    if (this.GlobleService.cartItemsNumber == 0) {
      this.showMenu = false;
      this.ToastrService.warning('Your cart is empty');
      return;
    } else {
      this.GlobleService.showCart = true;
    }
  }
  logout() {
    this.UserAuthService.logout().subscribe((res) => {
      console.log(res);
      this.GlobleService.isLogin = false;
      this.GlobleService.userImg = '';
      localStorage.removeItem('userToken');
      this.ToastrService.success('Logout successful');
      this.showMenu = true;
      this.showUserMenu = true;
      this.Router.navigate(['/login']);
    });
  }
}
