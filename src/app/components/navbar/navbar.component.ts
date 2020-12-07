import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  isTherephoto:boolean=false;
  data = {
    nombre: '',
    apellido: '',
    photo: '',
    role: ''
  }
  photo;
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private bagService: ShoppingBagService,
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase
  ) { 
    
  }

  async ngOnInit() {
    this.auth.user$.subscribe(async user => {
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

        let contador=0;
        // this.db.list("/users/" + user.uid).snapshotChanges().pipe(
        //   map(changes => changes.map(c => {
            
        //     // console.log(changes)
        //     // console.log(c.payload.val());
        //     if (c.key == 'photo') {
        //       // console.log('1234');
        //       let key = c.key;
        //       this.data[key] = c.payload.val();
        //       console.log(c.payload.val());
        //       this.photo=c.payload.val();
        //     }
        //   }))
        // ).subscribe(c => {
        //   // console.log(c)
        //   // this.photo = c.payload.val();
        //   c.map(k => {
            
        //   });
        // })
        
        this.db.list("/users/" + user.uid).stateChanges().subscribe(c=>{
          if (c.key=='photo'){
            // console.log(c.payload.val())
            this.photo=c.payload.val();
            // console.log(this.photo)
            // console.log(this.photo);
            if (this.photo == "" || this.photo == undefined || this.photo == null) {
              
              this.isTherephoto = false;
              console.log(this.isTherephoto);
            } else {

              // console.log(this.user.photoURL);
              this.isTherephoto = true;
              this.data.photo = this.user.photo;
              // console.log(this.data.photo);
              console.log(this.isTherephoto);

            }

          }
 
        });
         

        

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
