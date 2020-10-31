import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products$;
  categories$;
  
  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => (
        {
          key: c.key, 
          title: c.payload.val()['title'],
          price: c.payload.val()['price'],
          imageUrl: c.payload.val()['imageUrl']
        })))
    )

    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, name: c.payload.val()})))
    )

    console.log(this.categories$)
   }

  ngOnInit(): void {
  }

}
