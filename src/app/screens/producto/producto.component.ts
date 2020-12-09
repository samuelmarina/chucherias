import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RoleService } from 'src/app/services/role/role.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  product: Producto = {
    key: null,
    title: "",
    price: 1,
    category: "",
    imageUrl: "",
    quantity: 1,
    description: ""
  };
  title: string;
  productId: string;
  showActions: boolean;
  role:any;
  
  constructor(private productService: ProductService, private route: ActivatedRoute,private auth: AuthService,
    private roleService: RoleService) {
    auth.user$.subscribe(user => {
      this.showActions = user ? true : false;
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
    this.route.paramMap.subscribe(params=>{
      this.productId = params.get('productid');
    });
    this.productService.getProduct(this.productId).snapshotChanges().pipe(take(1))
        .subscribe(product => {
          console.log('Deberia ser el Id '+this.productId);
          
          this.product = {
            key: this.productId,
            ...product.payload.val() as any
            
          }
          this.title=this.product.title  
        })
   }
}
