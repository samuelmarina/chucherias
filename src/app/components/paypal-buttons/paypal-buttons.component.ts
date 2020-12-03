import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'paypal-buttons',
  templateUrl: './paypal-buttons.component.html',
  styleUrls: ['./paypal-buttons.component.css']
})
export class PaypalButtonsComponent implements OnInit {
  paypalConfig?: IPayPalConfig;
  @Input('totalPayment') totalPayment;
  @Input('form') form;
  @Input('user') user: firebase.User;
  @Input('id') id;
  @Input('currentPayment') currentPayment;
  @Input('currentRetiro') currentRetiro;
  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
      
      this.paypalConfig = {
      currency: 'USD',
      clientId: 'AZNHGDEMv256vUkkGY2pzKJuhsB5eoJL3vxM-Ljxadzk6mrj-R_IMH0T5hmN9EMyNd2OfzrAnsomTQSA',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalPayment,
            },
          }
        ]
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        this.form['retiro'] = this.currentRetiro;
          this.form['payment'] = this.currentPayment;
          this.makePayment(this.form);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        alert("Ocurrió un error. Por favor, inténtelo de nuevo");
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        
      },
    };
    }

    private makePayment(form){
    let order = {
      date: this.getDate(),
      userName: this.user.displayName,
      userId: this.user.uid,
      status: "pagado",
      retiro: form['retiro'],
      paymentMethod: form['payment'],
      totalPayment: null,
      pedido: null
    }
    
    let pedido = [];
    let totalPayment = 0;
    if(this.id){
      this.buyOneBag(pedido, order, totalPayment);
    }
    else{
      this.buyAllCart(pedido, order, totalPayment);
    }
  }

  private buyOneBag(pedido: any[], order, totalPayment: number){
    this.cartService.getCart2(this.user).valueChanges().pipe(take(1)).subscribe(cart => {
        for(let bag in cart[0][this.id]['bag']['products']){
          for(let prod in cart[0][this.id]['bag']['products'][bag]){
            if(prod === 'quantity') continue;
              
              let product = {
                key: cart[0][this.id]['bag']['products'][bag][prod]['key'],
                title: cart[0][this.id]['bag']['products'][bag][prod]['title'],
                price: cart[0][this.id]['bag']['products'][bag][prod]['price'],
                quantity: cart[0][this.id]['bag']['products'][bag]['quantity']
              }
              pedido.push(product);
              totalPayment += product.price * (product.quantity/50);
              this.productService.reduceQuantity(product);
          }
        }
        order.pedido = pedido;
        order.totalPayment = totalPayment;
        this.cartService.removeBag2(this.id, this.user);
        let key = this.orderService.create(order);
        this.router.navigate(['/order-success/', key]);
      })
  }

  private buyAllCart(pedido: any[], order, totalPayment: number){
    this.cartService.getCart2(this.user).valueChanges().pipe(take(1)).subscribe(cart => {
        for(let bagKey in cart[0]){
          for(let bag in cart[0][bagKey]['bag']['products']){
            for(let prod in cart[0][bagKey]['bag']['products'][bag]){
              if(prod === 'quantity') continue;
              
              let product = {
                key: cart[0][bagKey]['bag']['products'][bag][prod]['key'],
                title: cart[0][bagKey]['bag']['products'][bag][prod]['title'],
                price: cart[0][bagKey]['bag']['products'][bag][prod]['price'],
                quantity: cart[0][bagKey]['bag']['products'][bag]['quantity']
              }
              pedido.push(product);
              totalPayment += product.price * (product.quantity/50);
              this.productService.reduceQuantity(product);
            }
          }
        }
        order.pedido = pedido;
        order.totalPayment = totalPayment;
        this.cartService.removeCart(this.user);
        let key = this.orderService.create(order);
        this.router.navigate(['/order-success/', key]);
      })
  }

  private getDate(){
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    return day + "/" + month + "/" + year;
  }

}
