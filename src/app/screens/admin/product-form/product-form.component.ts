import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product: Producto = {
    key: null,
    title: "",
    price: 1,
    category: "",
    imageUrl: "",
    quantity: 1,
    description: ""
  };
  id;

  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, name: c.payload.val()})))
    )

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.getProduct(this.id).snapshotChanges().pipe(take(1))
        .subscribe(product => {
          this.product = {
            key: product.key,
            ...product.payload.val() as any
          }
        })
    }
  }

  save(product) {
    if(this.id){
      this.productService.update(this.id, product);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['admin/productos']);
  }

  delete(){
    if(confirm("Está seguro que desea eliminar el producto?")){
      this.productService.delete(this.id);
      this.router.navigate(['admin/productos']);
    }
  }
}
