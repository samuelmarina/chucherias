import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { fakeAsync } from '@angular/core/testing';
import { timer } from 'rxjs';
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
  AvailableForMore;
  AvailableForLess;
  comprar: boolean = false;
  // contador = timer(1000);
  constructor(
    private authService: AuthService,
    private bagService: ShoppingBagService,
    private wLService: WishListService
  ) {
    authService.user$.subscribe(async user => {
      if (user) {
        this.user = user;
        // console.log(this.product);
        if (await wLService.existe2(this.product, user) == true) {
          this.isLiked = true;
          // console.log(this.product.title );
        } else {
          this.isLiked = false;
          // console.log(this.product.title);
        }
      }
      if (this.product.quantity > 0) {
        this.AvailableForMore = true;
        // }else{
        // this.AvailableForLess=false;
      }

      // this.quantity= await this.product.quantity;

    })
  }

  ngOnInit(): void {
  }


  onComprar() {
    this.comprar = true;
    this.quantity = this.product.quantity;
  }


  async addToBag(product) {

    // this.contador.subscribe(async (n) => {

      // this.quantity=this.product.quantity;

      if (await this.bagService.isAvailableQuantityProduct(product)) {
        if (await this.bagService.addToBag(product, this.user) == true) {

          this.quantity = await this.product.quantity;

        }
      // } else {
        // console.log('Ya no hay mas ');
      // }
      // this.product.quantity -= await 50;
      // console.log(this.product.quantity);
      // if(product.quantity>0){
      // }else{
      // this.AvailableForMore==false;
      // }

    // });


  }
}

  toWait() {
    //console.log()
  }
  async removeFromBag(product) {
    // this.contador.subscribe(async (n) => {
      if (await this.bagService.removeFromBag(product, this.user) == true) {
        if (this.product.quantity >= 0) {
          this.quantity = await this.product.quantity;
        }
      }

    // });

    // this.quantity -= 50;

    // this.product.quantity -= await 50;

    // if(this.AvailableForMore==false){
    // this.AvailableForMore=true;
    // }



  }

  addToWL(product) {
    this.wLService.addToWL(product, this.user);
  }

  deleteToWL(product) {
    this.wLService.deleteTWL(product, this.user);
  }


  like(product) {
    this.isLiked = !this.isLiked;


    // console.log(product.product);
    if (this.isLiked) {
      this.addToWL(product);

    } else {
      this.deleteToWL(product);
    }
  }

}