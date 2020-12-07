import { Component, OnInit } from '@angular/core';

import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from "firebase/app";
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { ShoppingCart } from 'src/app/schemas/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  user: User;
  booleano: boolean;
  allBags: uiShoppingBag[];
  totalPrice: number = 0;
  totalBags: number = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit(){
    this.auth.user$.subscribe(user => {
      if(user){
        this.user = user;
        let ref = firebase.database().ref("/users/" + user.uid + "/shopping-cart/");
        ref.once("value").then(res => {
          this.booleano = res.exists();
        })

        this.cartService.getCart(this.user).valueChanges().subscribe(cart => {
          this.totalPrice = 0;
          if(!cart) return;
          let allBags = [];
          for(let bagId in cart.bags){
            allBags.push(cart.bags[bagId]['bag']);
            this.totalPrice += cart.bags[bagId]['bag']['totalPrice'];
          }
          this.allBags = allBags;
          this.totalBags = cart.quantity;
        })
      }
      
      
  })
  }

  checkOut() {
    this.router.navigate(['/check-out']);
  }

}
