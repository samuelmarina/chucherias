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

@Component({
  selector: 'app-wishlist-products',
  templateUrl: './wishlist-products.component.html',
  styleUrls: ['./wishlist-products.component.css']
})
export class WishlistProductsComponent implements OnInit {
  all_products = [];
  user:User;
  booleano2:boolean;

  constructor(route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthService,
    private wishListService:WishListService) { 
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/wish-list/");
      ref.once("value").then(res => {
        this.booleano2 = res.exists();
        console.log(this.booleano2);

        this.wishListService.getWishListUser(user).valueChanges().pipe(
          map(changes => changes.map(c => c))
        ).subscribe(c => {
          c.map(k => this.all_products.push(k))
        });
        console.log(this.all_products);
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
  }
    

  ngOnInit(): void {
  }


}
