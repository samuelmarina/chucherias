import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  products$;
  dataSource: MatTableDataSource<any>;
  elementData = [];
  displayedColumns: string[] = ["title", "price", "edit"]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) { 
    // this.products$ = this.productService.getAll().snapshotChanges().pipe(
    //   map(changes => changes.map(c => (
    //     {
    //       key: c.key, 
    //       title: c.payload.val()['title'],
    //       price: c.payload.val()['price']
    //     })))
    // )

    this.productService.getAll().valueChanges().pipe(
      map(changes => changes.map(c => c))
    )
    .subscribe(c => {
      c.map(k => this.elementData.push(k))
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.paginator = this.paginator;
    });
    
  }


  ngOnInit(): void {

  }

}