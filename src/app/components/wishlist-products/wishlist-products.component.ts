import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../screens/lista-productos/lista-productos.component';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from "firebase/app";
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { Producto } from 'src/app/schemas/producto';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-wishlist-products',
  templateUrl: './wishlist-products.component.html',
  styleUrls: ['./wishlist-products.component.css']
})
export class WishlistProductsComponent implements OnInit {
  all_products = [];
  user:User;
  booleano2:boolean;
  quantity;
  bagService: any;
  wLService: any;
  isLiked: boolean;
  constructor(route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthService,
    private wishListService:WishListService,
    private router: RouterModule) { 
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

  delete_product(product: Producto){
    this.wishListService.deleteTWL(product, this.user);
    
    this.wishListService.getWishListUser(this.user).valueChanges().pipe(
      map(changes => changes.map(c => c))
    ).subscribe(c => {
      this.all_products = c
      if (this.all_products.length == 0) {
        window.location.reload();
      }
    });
    
    // window.location.reload();
  }
    
  deleteAllProducts(){
    this.wishListService.deleteAllWL(this.user);
    window.location.reload();
  }

  ngOnInit(): void {
  }


  addToBag(product) {
    this.bagService.addToBag(product, this.user);
    this.quantity += 50;
  }

  removeFromBag(product) {
    this.bagService.removeFromBag(product, this.user);
    this.quantity -= 50;
  }

  addToWL(product) {
    this.wLService.addToWL(product, this.user);
  }

  deleteToWL(product) {
    this.wLService.deleteTWL(product, this.user);
  }


  like(product) {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.addToWL(product);

    } else {
      this.deleteToWL(product);
    }
  }

}
