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
    this.bagService.addToBag(product);
  }

}
