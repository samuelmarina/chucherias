import { Component, OnInit } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  private filePath:any;
  private image:any;
  private downloadUrl: string;
  private downloadUrl2: string = "hola";
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
    private productService: ProductService,
    // private storage: AngularFireStorage
    ) { 
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
    for (let prod in product){
      if(product[prod] === "") return alert("Error: verifique haber rellanado todos los campos");
      switch (prod) {
        case 'price':
          if(product[prod] <= 0) return alert("Error: el precio no puede ser inferior a cero");
          break;
        case 'quantity':
          if(product[prod] <= 0) return alert("Error: la cantidad no puede ser inferior a cero");
        default:
          break;
      }
    }
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

  // handleImage(event:any):void{
  //   this.image = event.target.files[0];
  //   console.log('IMG: ', this.image);
  //   this.filePath = `images/${this.image.name}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const task = this.storage.upload(this.filePath, this.image);
    
  //   task.snapshotChanges().pipe(
  //     finalize(()=>{
  //       fileRef.getDownloadURL().subscribe( urlImage =>{
  //         this.downloadUrl = urlImage;
  //         console.log('URL IMAGE: ', this.downloadUrl);
  //         document.getElementById("imageUrl").innerHTML = this.downloadUrl
  //       })
  //     })
  //   ).subscribe();
    
      
  // }

}
