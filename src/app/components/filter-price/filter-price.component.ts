import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent implements OnInit {
  precio$;
  // @Input("precio") precio;
  price='0';
  @Input("filteredProducts") filteredProducts;
  category:string;
  products=[];
  
  constructor(
              private productService:ProductService,
              private route: ActivatedRoute,
              ) {
    
      
  }



  ngOnInit(): void {
  }

  more() {
    this.price=(parseFloat(this.price) + 1).toString();
  }

  less() {
    if (parseFloat(this.price) > 0) {
      this.price = (parseFloat(this.price)-1).toString();
    }
    if(parseFloat(this.price)<=0){
      this.price='0';
    }
  }


  save(){
    let data = document.getElementById("filterByPrice");
    this.products = [];
    // console.log(data);
    this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => c))
    )
      .subscribe(c => {
        c.map(k => {
          if (k.payload.val()['quantity'] > 0) {
            this.products.push({
              key: k.key,
              ...k.payload.val() as any
            } as Producto)
          }
        })
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = this.category ?
            this.products.filter(p => p['category'] === this.category) :
            this.products;

          // this.filteredProducts = this.filteredProducts.filter(p => p['price'] === parseFloat(data));
          console.log(this.filteredProducts);

        }
        )

        // this.filteredProducts=this.filteredProducts.filter(p=>p['price']===parseInt(data));

      }


      )
  
    }
  
  
  }



