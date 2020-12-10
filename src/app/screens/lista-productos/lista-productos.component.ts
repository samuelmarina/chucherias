import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RoleService } from 'src/app/services/role/role.service';
import {DOCUMENT} from '@angular/common';

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
  role:any;
  quantity=0;  
  price;
  
  constructor(
    private auth: AuthService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private productService: ProductService) {
      auth.user$.subscribe(user => {
        this.roleService.getRole(user.uid).valueChanges().subscribe(role => {
          if(!role){
            this.roleService.createRole(user.uid);
            return this.role = "user";
          }
          this.role = role;
          if(this.role == "admin"){
            this.showActions = false
          }else{
            this.showActions = true
          }
        })
        
      })

    this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => c))
    )
    .subscribe(c => {
      c.map(k => {
        if(k.payload.val()['quantity'] > 0) {
          this.products.push({
            key: k.key,
            ...k.payload.val() as any
          } as Producto)
        }
      })
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = this.category ?
        this.products.filter(p => p['category'] === this.category) :
        this.products;
        console.log(this.filteredProducts);

        console.log(params.get('category'));
        console.log(params.get('precio'));

        this.price = params.get('precio');
        this.filteredProducts = this.price ?
          this.filteredProducts.filter(p => p['price'] === parseFloat(this.price)) :
          this.filteredProducts;
        console.log(this.filteredProducts);
      }
      )
    });
    
  }

  ngOnInit(): void {
    
    
  }
  
  more(){
    this.quantity+=1;
  } 

  less(){
    if(this.quantity>0){
      this.quantity-=1;
    }
  }


  save(){
    // let data=document.getElementById("filterByPrice").value;
    this.products=[];
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


)}

}




  



export interface Product {
  title: string,
  price: number,
  category: string,
  imageUrl: string
}
