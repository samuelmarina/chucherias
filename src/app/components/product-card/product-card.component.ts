import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import {WishListService} from 'src/app/services/WishList/wish-list.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('showActions') showActions;
  user;
  isLiked: boolean;
  quantity = 0;
  blockAddBtn = false;

  constructor(
    private authService: AuthService,
    private bagService: ShoppingBagService,
    private wLService: WishListService,
    private productService: ProductService
  ) { 
    authService.user$.subscribe(async user => {
      if(user){
        this.user = user;
      //  console.log(this.product);
        if (await wLService.existe2(this.product, user)==true){
          this.isLiked=true;
          // console.log(this.product.title );
        }else{
          this.isLiked=false;
          // console.log(this.product.title);
        }
      }

    })
  }

  ngOnInit(): void {
  }

 

  async addToBag(product){
    this.bagService.addToBag(product, this.user);
    this.quantity += 50;
    let canAddMore = await this.productService.updateQuantity(product, "add");
    if(!canAddMore) this.blockAddBtn = true;
  }

  removeFromBag(product){
    this.bagService.removeFromBag(product, this.user);
    this.quantity -= 50;
    this.productService.updateQuantity(product, "remove");
    this.blockAddBtn = false;
  }

  addToWL(product) {
    this.wLService.addToWL(product, this.user);
  }

  deleteToWL(product){
    this.wLService.deleteTWL(product, this.user);
  }


  like(product){
    this.isLiked = !this.isLiked;
    
    
    // console.log(product.product);
    if(this.isLiked){
      this.addToWL(product);

    }else{
      this.deleteToWL(product);
    }
  }

}
