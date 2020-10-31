import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  products$;
  
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => (
        {
          key: c.key, 
          title: c.payload.val()['title'],
          price: c.payload.val()['price'],
          imageUrl: c.payload.val()['imageUrl']
        })))
    )
   }

  ngOnInit(): void {
  }

}
