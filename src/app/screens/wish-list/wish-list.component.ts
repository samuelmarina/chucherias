import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from "firebase/app";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { map } from 'rxjs/operators';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  showActions: boolean;
  all_products = [];
  user: User;
  booleano2: boolean;
  quantity = 0;
  booleano: boolean;

  constructor(private auth: AuthService,
    route: ActivatedRoute,
    private productService: ProductService,
    private wishListService: WishListService,
    private router: RouterModule,
    private bagService: ShoppingBagService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/wish-list/");
      ref.once("value").then(res => {
        this.booleano2 = res.exists();
        // console.log(this.booleano2);

        this.wishListService.getWishListUser(user).valueChanges().pipe(
          map(changes => changes.map(c => c))
        ).subscribe(c => {
          this.all_products = c
          // console.log(this.all_products);
        });

        // this.wishListService.getWishListUser(user).valueChanges().pipe(
        //   map(changes => changes.map(c => c))
        // ).subscribe(c => {
        //   c.map(k => this.all_products.push(k))
        // });

        // console.log(this.all_products);
        // console.log(this.all_products);

      })
    })

    this.auth.user$.subscribe(async user => {
      if (user) {
        this.user = user;


      }

    });
     }
  

  async ngOnInit(){
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/wish-list/");
      ref.once("value").then(res => {
        this.booleano = res.exists();
        console.log(this.booleano);
        
      })
  })
  }

  
  
  
}
