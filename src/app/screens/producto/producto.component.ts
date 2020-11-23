import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  product: Producto = {
    key: null,
    title: "",
    price: 1,
    category: "",
    imageUrl: "",
    quantity: 1
  };
  title: string;
  productId: string;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params=>{
      this.productId = params.get('productid');
      console.log(this.productId);
    });
    this.productService.getProduct(this.productId).snapshotChanges().pipe(take(1))
        .subscribe(product => {
          console.log('Deberia ser el Id '+this.productId);
          
          this.product = {
            key: this.productId,
            ...product.payload.val() as any
            
          }
        this.title=this.product.title  
        
        console.log('titulo '+this.title);
        })
    
   }

  ngOnInit(): void {
    
  }
  
}
