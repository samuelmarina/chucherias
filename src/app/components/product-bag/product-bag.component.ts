import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/schemas/producto';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';

@Component({
  selector: 'product-bag',
  templateUrl: './product-bag.component.html',
  styleUrls: ['./product-bag.component.css']
})
export class ProductBagComponent implements OnInit {
  @Input('product') product;
  @Input('qty') qty: number;
  constructor() { }

  ngOnInit(): void {
  }

}
