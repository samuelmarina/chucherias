import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-bag-list',
  templateUrl: './product-bag-list.component.html',
  styleUrls: ['./product-bag-list.component.css']
})
export class ProductBagListComponent {
  @Input('shoppingBag') shoppingBag: uiShoppingBag; 
  user;

  constructor(
    private bagService: ShoppingBagService,
    private cartService: ShoppingCartService,
    private router: Router,
    private auth: AuthService
  ) { 
    auth.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })

  }

  moveToCart(){
    this.cartService.addToCart(this.shoppingBag, this.user);
    this.bagService.removeBag(this.shoppingBag, this.user);
    this.router.navigate(['/carrito']);
  }

  deleteBag(){
    if(confirm("Está seguro que desea eliminar esta bolsa?")){
      this.bagService.removeBag(this.shoppingBag, this.user);
      window.location.reload()
    }
  }

}
