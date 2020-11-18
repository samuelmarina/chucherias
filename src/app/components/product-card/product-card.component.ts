import { Component, Input, OnInit } from '@angular/core';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('show-actions') showActions = true;

  constructor(
    private bagService: ShoppingBagService
  ) { }

  ngOnInit(): void {
  }

  addToBag(product){
    let bagId = localStorage.getItem('bagId');
    if(!bagId) {
      this.bagService.create().then(res => {
        localStorage.setItem("bagId", res.key);
      })
    }
    else {
      
    }
  }

}
