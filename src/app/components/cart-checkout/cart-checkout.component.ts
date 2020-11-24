import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/schemas/shopping-cart';

@Component({
  selector: 'cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  @Input('totalPrice') totalPrice: number;
  @Input('totalQuantity') totalQuantity: number;

  /**
   * Utiliza la variable totalQuantity para mostrar el texto "Total (X bolsas)"
   * y la variable totalPrice para mostrar el precio total de todo el carrito
   * (no hace falta hacer ningún calculo, solo utilizar los inputs para mostrarlos en el html)
   */

  constructor() {
   }

  ngOnInit(): void {
    
  }

}
