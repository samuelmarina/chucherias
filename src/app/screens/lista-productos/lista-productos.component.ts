import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products: any[] = [];
  filteredProducts = [];
  categories$;
  category: string;
  
  constructor(
    route: ActivatedRoute,
    private productService: ProductService, 
    private categoryService: CategoryService) {

    // this.products$ = this.productService.getAll().snapshotChanges().pipe(
    //   map(changes => changes.map(c => (
    //     {
    //       key: c.key, 
    //       title: c.payload.val()['title'],
    //       price: c.payload.val()['price'],
    //       imageUrl: c.payload.val()['imageUrl']
    //     })))
    // )

    this.productService.getAll().valueChanges().pipe(
      map(changes => changes.map(c => c))
    )
    .subscribe(c => {
      c.map(k => this.products.push(k))
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category ?
        this.products.filter(p => p['category'] === this.category) :
        this.products;

      })
    });


    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, name: c.payload.val()})))
    )
    
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
