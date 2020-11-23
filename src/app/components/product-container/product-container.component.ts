import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { Product } from 'src/app/screens/lista-productos/lista-productos.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {
  @Input ('product') product;
  
  
  
  user;
  userQuantity: number = 0;

  title: string;

  constructor( private authService: AuthService,
    private bagService: ShoppingBagService ) {
      

      
          authService.user$.subscribe(async user => {
            if(user){
              this.user = user;
            }
          })
     }

  ngOnInit(): void {
  }
  addToBag(product){
    this.bagService.addToBag(product, this.user);
    this.userQuantity += 50;
  }

  removeFromBag(product){
    this.bagService.removeFromBag(product, this.user);
    this.userQuantity -= 50;
  }
}
