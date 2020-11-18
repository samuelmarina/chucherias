import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products: any[] = [];
  filteredProducts = [];
  


  category: string;
  
  

  constructor(
    route: ActivatedRoute,
    private productService: ProductService) {

    // this.productService.getAll().snapshotChanges().pipe(
    //   map(actions => {
    //     console.log("HGey")
    //   })
    // )
      
    // this.productService.getAll().snapshotChanges().pipe(
    //   map(changes => {
    //     changes.map(c => {
    //     this.products.push(
    //     {
    //       key: c.key, 
    //       ...c.payload.val() as any
    //     })
    //   })
      
    //   })
    // )

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
