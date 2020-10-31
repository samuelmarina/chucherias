import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import {MatTableDataSource} from '@angular/material/table';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  products$;
  displayedColumns: string[] = ["title", "price", "edit"]

  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => (
        {
          key: c.key, 
          title: c.payload.val()['title'],
          price: c.payload.val()['price']
        })))
    )
    
  }


  ngOnInit(): void {

  }

}