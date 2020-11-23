import { Component, Input, OnInit } from '@angular/core';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';

@Component({
  selector: 'product-cart-list',
  templateUrl: './product-cart-list.component.html',
  styleUrls: ['./product-cart-list.component.css']
})
export class ProductCartListComponent implements OnInit {
  @Input('shoppingBag') shoppingBag: uiShoppingBag;

  constructor() { }

  ngOnInit(): void {
  }

  deleteBag(){

  }

  buyBag(){

  }

}
