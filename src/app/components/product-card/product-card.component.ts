import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import {WishListService} from 'src/app/services/wish-list.service';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  user;

  constructor(
    private authService: AuthService,
    private bagService: ShoppingBagService,
    private wLService: WishListService
  ) { 
    authService.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
  }

  addToBag(product){
    this.bagService.addToBag(product, this.user);
  }

  addToWL(product) {
    this.wLService.addToWL(product, this.user);
  }


}
