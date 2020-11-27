import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-cart-list',
  templateUrl: './product-cart-list.component.html',
  styleUrls: ['./product-cart-list.component.css']
})
export class ProductCartListComponent implements OnInit {
  @Input('shoppingBag') shoppingBag: uiShoppingBag;
  user;

  constructor(
    private cartService: ShoppingCartService,
    private auth: AuthService,
    private router: Router
  ) { 
    this.auth.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
  }

  deleteBag(){
    if(confirm("Está seguro que desea eliminar esta bolsa del carrito?")){
      this.cartService.removeBag(this.shoppingBag, this.user);
    }
  }

  buyBag(){
    this.router.navigate(['/check-out', this.shoppingBag.key])
    // console.log(this.shoppingBag);
  }

}
