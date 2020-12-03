import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { cartBag } from 'src/app/schemas/shopping-bag';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RetiroService } from 'src/app/services/retiro/retiro.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
 import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  paypalConfig?: IPayPalConfig;

  retiros;
  currentRetiro = "";
  isDelivery = false;

  payments;
  currentPayment = ""
  isTDC = false;
  isPaypal = false;

  address = {
    name: "",
    address: ""
  }

  payment = {}

  id;

  user;

  totalPaymentAmount = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private retiroService: RetiroService,
    private paymentService: PaymentService,
    private cartService: ShoppingCartService,
    private productService: ProductService,
    private orderService: OrderService
    ) { 
      this.id = this.route.snapshot.paramMap.get('id');

      this.auth.user$.subscribe(async user => {
        if(user){
          this.user = user;
        }
      })
      
      this.retiroService.getAll().valueChanges().subscribe(retiros => {
        this.retiros = retiros;
      })

      this.paymentService.getAll().valueChanges().subscribe(payments => {
        this.payments = payments;
      })

      // this.getTotalPrice();
    }
  
  async ngOnInit() {
     
  }

  retiroChangeHandler(event){
    this.currentRetiro = event.target.value;
    this.currentRetiro === 'Delivery' ? this.isDelivery = true : this.isDelivery = false;
  }

  getTotalPrice(){
    if(this.id){
      this.getPriceOneBag();
    }
    else{
      this.getPriceCart();
    }
  }

  getPriceCart(){
    let totalPayment = 0;
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
            totalPayment += product.price * (product.quantity/50);
          }
        }
      }
      this.totalPaymentAmount = totalPayment;
    })
  }

  getPriceOneBag() {
    let totalPayment = 0;
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
            totalPayment += product.price * (product.quantity/50);
        }
      }
      this.totalPaymentAmount = totalPayment;
    })
  }

  paymentChangeHandler(event){
    this.currentPayment = event.target.value;
    switch (this.currentPayment) {
      case 'Tarjeta de Crédito':
        this.isTDC = true;
        this.isPaypal = false;
        break;
      case 'PayPal':
        this.isTDC = false;
        this.isPaypal = true;
        this.getTotalPrice();
        break;
      default:
        this.isTDC = false;
        this.isPaypal = false;
        break;
    }
  }

  save(form) {
    for(let field in form){
      if(!form[field]){
        return alert("Error: Revise que haya llenado todos los campos obligatorios");
      }
    }

    if(this.currentRetiro === "" || this.currentPayment === ""){
      return alert("Error: verifique haber seleccionado un método de pago y un método de retiro")
    }
    
    form['retiro'] = this.currentRetiro;
    form['payment'] = this.currentPayment;
    
    this.makePayment(form);
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
