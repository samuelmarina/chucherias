import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import {WishListService} from 'src/app/services/WishList/wish-list.service';
import { AngularFireDatabase } from '@angular/fire/database';
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

  constructor(
    private authService: AuthService,
    private bagService: ShoppingBagService,
    private wLService: WishListService,
  ) { 
    authService.user$.subscribe(async user => {
      if(user){
        this.user = user;
       
        if (await wLService.existe2(this.product, user)==true){
          this.isLiked=true;
        }else{
          this.isLiked=false;
        }
      }

    })
  }

  ngOnInit(): void {
  }

 

  addToBag(product){
    this.bagService.addToBag(product, this.user);
    this.quantity += 50;
  }

  removeFromBag(product){
    this.bagService.removeFromBag(product, this.user);
    this.quantity -= 50;
  }

  addToWL(product) {
    this.wLService.addToWL(product, this.user);
  }

  deleteToWL(product){
    this.wLService.deleteTWL(product, this.user);
  }


  like(product){
    this.isLiked = !this.isLiked;
 
    if(this.isLiked){
      this.addToWL(product);

    }else{
      this.deleteToWL(product);
    }
  }

}
