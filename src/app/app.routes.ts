import { Routes } from '@angular/router';
import { HomeComponent } from './compoonents/pages/home/home.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./compoonents/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('./compoonents/pages/register/register.component').then(
        (c) => c.RegisterComponent
      );
    },
    title: 'Register',
  },
  {
    path: 'checkout',
    loadComponent: () => {
      return import('./compoonents/pages/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      );
    },
    canMatch: [loginGuard],
    title: 'Checkout',
  },
  {
    path: 'payment',
    loadComponent: () => {
      return import('./compoonents/pages/payment/payment.component').then(
        (c) => c.PaymentComponent
      );
    },
    title: 'Payment',
    canMatch: [loginGuard],
  },

  {
    path: 'track/:orderId',
    loadComponent: () => {
      return import(
        './compoonents/pages/order-track/order-track.component'
      ).then((c) => c.OrderTrackComponent);
    },
    canMatch: [loginGuard],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./compoonents/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Not Found',
  },
];
