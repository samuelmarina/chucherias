import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products: any[] = [];
  filteredProducts = [];
  showActions: boolean;
  category: string;
  
  

  constructor(
    private auth: AuthService,
    route: ActivatedRoute,
    private productService: ProductService) {
      auth.user$.subscribe(user => {
        this.showActions = user ? true : false;
      })

    this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => c))
    )
    .subscribe(c => {
      c.map(k => {
        this.products.push({
          key: k.key,
          ...k.payload.val() as any
        } as Producto)
      })
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category ?
        this.products.filter(p => p['category'] === this.category) :
        this.products;

      })
    });

  }

  ngOnInit(): void {
    
    
  }
  
  

}

  



export interface Product {
  title: string,
  price: number,
  category: string,
  imageUrl: string
}
