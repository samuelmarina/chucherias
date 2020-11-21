import { Component, Input, OnInit } from '@angular/core';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';

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
    private auth: AuthService
  ) { 
    auth.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })

  }

  moveToCart(){
    /**
     * En este espacio se tiene que colocar la función
     * que elimina una bolsa de las shopping-bags en la bd
     * y la agrega al carrito
     */
  }

  deleteBag(){
    if(confirm("Está seguro que desea eliminar esta bolsa?")){
      this.bagService.removeBag(this.shoppingBag, this.user);
      window.location.reload()
    }
  }

}
