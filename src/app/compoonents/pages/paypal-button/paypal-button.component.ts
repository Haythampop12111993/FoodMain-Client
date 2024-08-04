import { GlobleService } from './../../../services/globle/globle.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../../../services/checkout-service/checkout.service';
import { OrderService } from './../../../services/orderService/order.service';
import { render } from 'creditcardpayments/creditCardPayments';

import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NgxPayPalModule,
  IPayPalConfig,
  ICreateOrderRequest,
} from 'ngx-paypal';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [NgxPayPalModule],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css',
})
export class PaypalButtonComponent {
  showSuccess = false;
  showCancel = false;
  showError = false;
  @Input() order: any;
  @ViewChild('paypal', {
    static: true,
  })
  paypalElement!: ElementRef;
  paymentID: string = '';
  constructor(
    private OrderService: OrderService,
    private CheckoutService: CheckoutService,
    private GlobleService: GlobleService,
    private ToastrService: ToastrService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.initConfig();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const self = this;
    // console.log(this.order.AllTotalPrice);
    // render({
    //   id: '#myPaypalButtons',
    //   currency: 'USD',
    //   value: '100.00',
    //   onApprove: (details: any) => {
    //     console.log(details);
    //     window.alert('Payment Successfull');
    //   },
    // });
    ////////////////////////////////////////
    // paypal
    //   .Buttons({
    //     createOrder: (data: any, actions: any) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               currency_code: 'USD',
    //               value: self.order.AllTotalPrice,
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     onApprove: async (data: any, actions: any) => {
    //       const payment = await actions.order.capture();
    //       self.order.paymentId = payment.id;
    //       console.log(payment);
    //       this.OrderService.pay(this.order).subscribe({
    //         next: (res) => {
    //           console.log(res);
    //           this.CheckoutService.deleteCheckout().subscribe({
    //             next: (res) => {
    //               console.log(res);
    //             },
    //             error: (err) => {
    //               console.log(err);
    //             },
    //           });

    //           this.Router.navigate(['/track/', res._id]);
    //           this.ToastrService.success(
    //             'Payment Saved Successfully',
    //             'Success'
    //           );
    //         },
    //         error: (err) => {
    //           console.log(err);
    //           this.ToastrService.error(err.error.message, 'Error');
    //         },
    //       });
    //     },
    //     onError: (err: any) => {
    //       console.log(err);
    //     },
    //   })
    //   .render(this.paypalElement.nativeElement);
    ///////////////////////////////////////////////////////////////
    // paypal
    //   .Buttons({
    //     style: {
    //       layout: 'horizontal',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal',
    //     },
    //     createOrder: (data: any, actions: any) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: this.order.AllTotalPrice,
    //               currency_code: 'USD',
    //             },
    //           },
    //         ],
    //         orderId: data.orderId,
    //       });
    //     },
    //     onApprove: async (data: any, actions: any) => {
    //       const payment = await actions.order.capture();
    //       console.log(payment);
    //     },
    //   })
    //   .render(this.paypalElement.nativeElement);
    // this.initConfig();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes['order'].currentValue);
    // if (changes['order'].currentValue) {
    //   this.items.push(
    //     ...changes['order'].currentValue.order.map((item: any) => ({
    //       name: item.foodId.name,
    //       quantity: item.quantity,
    //       category: 'DIGITAL_GOODS',
    //       unit_amount: {
    //         currency_code: 'USD',
    //         value: item.foodId.price,
    //       },
    //     }))
    //   );

    //   console.log(this.items);
    // }
  }

  public payPalConfig?: IPayPalConfig;

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AWrGfO93T2aTIKKyAnSMN5N8-4e3cj2LaNs07XoGsZNyer0c9NqBz3FyaQEJBwg5yj60JZGu474I7_-c',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.order.AllTotalPrice,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.order.AllTotalPrice,
                  },
                },
              },
              items: [
                ...this.order.order.map((item: any) => {
                  return {
                    name: item.foodId.name,
                    quantity: item.quantity,
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                      currency_code: 'USD',
                      value:
                        (item.foodId.price * item.quantity + 3) / item.quantity,
                    },
                  };
                }),
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data: any, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        this.paymentID = data.paymentID;
        console.log(this.paymentID);
        this.OrderService.pay(data).subscribe({
          next: (res) => {
            console.log(res);
            this.GlobleService.checkoutData = [];
            this.GlobleService.isCheckout = false;
            this.ToastrService.success('Payment Saved Successfully');
            this.Router.navigate(['/track/', res.data._id]);
          },
          error: (err) => {
            console.log(err);
          },
        });

        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  pay(): void {
    console.log(this.order);
    this.OrderService.createPayment(this.order).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
