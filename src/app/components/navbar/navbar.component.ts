import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/role/role.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { UserService } from 'src/app/services/user/user.service';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user;
  logged = false;
  role;
  available: boolean = false;
  bagQty = 0;
  cartQty = 0;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private bagService: ShoppingBagService,
    private cartService: ShoppingCartService
  ) { 
    
  }

  async ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if(user){
        this.logged = true;
        this.roleService.getRole(user.uid).valueChanges().subscribe(role => {
          if(!role){
            this.roleService.createRole(user.uid);
            return this.role = "user";
          }
          this.role = role;
        })

        let bag$ = this.bagService.getBag(this.user);
        bag$.valueChanges().subscribe(bag => {
          if(!bag) return this.bagQty = 0;

          this.bagQty = bag['quantity'];
        })

        this.cartService.getCart(this.user).valueChanges().subscribe(cart => {
          if(!cart) return this.cartQty = 0;

          this.cartQty = cart.quantity;
        })

      }   
    })
    
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    this.logged = false;
  }

  availableburgerItems() {
    this.available = !this.available
  }
}
