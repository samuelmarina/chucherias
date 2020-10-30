import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getAll();
    console.log(this.products$);
  }

  ngOnInit(): void {
  }

}
