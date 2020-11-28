import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { Product} from '../../screens/lista-productos/lista-productos.component';

@Component({
  selector: 'app-productos-aleatorios',
  templateUrl: './productos-aleatorios.component.html',
  styleUrls: ['./productos-aleatorios.component.css']
})
export class ProductosAleatoriosComponent implements OnInit {
  @Input('showActions') showActions: boolean;
  products: any[] = [];
  filteredProducts = [];
  productsById: any[] = [];
  productosHome: any[] = [];
  al: string;
  arr = [];
  route: ActivatedRoute;
  all_products = [];
  todproducts:any[]=[];
  isLiked: boolean;
  user;
  ids = [];
  product;
  aleatoryProducts;
  n_aleatory_products = 7;
  category: string;
  numero: number;
  array: string[] = [];
  constructor(route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private wLService: WishListService) {
     {
      // console.log('AQUI');
      this.ids = this.getProd();
      
      // console.log('ids');
      // console.log(this.ids.length);
      // console.log((this.ids));
      
      // console.log(this.all_products);


      // console.log(this.array);





      // this.products$ = this.productService.getAll().snapshotChanges().pipe(
      //   map(changes => changes.map(c => (
      //     {
      //       key: c.key, 
      //       title: c.payload.val()['title'],
      //       price: c.payload.val()['price'],
      //       imageUrl: c.payload.val()['imageUrl']
      //     })))
      // )



      // this.productService.getAll().valueChanges().pipe(
      //   map(changes => changes.map(c => c))
      // )
      //   .subscribe(c => {
      //     c.map(k => this.all_products.push(k) )
      
          
          this.productService.getAll().snapshotChanges().pipe(
            map(changes => changes.map(c => c))
          )
            .subscribe(c => {
              c.map(k => {
                this.all_products.push({
                  key: k.key,
                  ...k.payload.val() as any
                } as Producto)
              })
            
          
          this.arr = productService.getNAleatoryProducts(this.n_aleatory_products, this.all_products);
          // console.log(this.arr);               IMPORTANTE PARA NOTAR EN LA CONSOLA CADA OBJETO DEL ARRAY
          // console.log(this.all_products[1]);

          // this.productService.getAll().snapshotChanges().pipe(
          //   map(changes => changes.map(c => c))
          // )
          //   .subscribe(c => {
          //     c.map(k => {
          //       this.todproducts.push({
          //         key: k.key,
          //         ...k.payload.val() as any
          //       } as Producto)
          //     })})
              // console.log(this.all_products);
              // console.log(this.todproducts);

          route.queryParamMap.subscribe(params => {
            var n = this.arr.length;
            // this.arr=this.arr.sort();
            // console.log(this.arr);                //IMPORTANTE PARA NOTAR EN LA CONSOLA CADA OBJETO DEL ARRAY

            for (let i = 0; i < this.arr.length; i++) {

              for (let j = 0; j < this.all_products.length; j++) {

                if (this.arr[i] == j) {
                  // console.log(this.arr[i]); //IMPORTANTE PARA NOTAR EN LA CONSOLA LOS OBJETOS DEL ARRAY
                  this.al = params.get('id');
                  // console.log(params);
                  
                  this.productsById = this.al ?
                  this.all_products.filter(p => p['id'] === this.al ) :
                  this.all_products;
                  // console.log(this.all_products[j].title);
                  
                  // console.log(this.productsById);
                  // console.log(this.all_products[j]);
                  this.productService.getAll().snapshotChanges().forEach(productSnapshot => {
                    productSnapshot.forEach(productSnapshot => {
                      // let prod = productSnapshot.payload.key
                      let prod = productSnapshot.payload.toJSON();
                      prod['$key'] = productSnapshot.key;
                      // console.log(prod['title']);
                      // console.log(this.all_products[j].title);
                      if (this.all_products[j]['title']==prod['title']) {
                        // console.log('entra==>', prod['$key'], prod['title'])
                        this.all_products[j]['key'] = prod['$key']; 
                  
                      }
                    } )
                  }) ; //ESTO APARENTEMENTE NO SERVIRA
                  
                  // console.log(this.ids[0])
                  // (this.ids.forEach(productSnapshot => {console.log(productSnapshot)}));

                  // this.all_products[j]['key']=this.[j];
                  // console.log(this.all_products[j]['key']);
                  
                  this.productosHome.push(this.all_products[j]);
                  // console.log(this.productosHome[j]);
                  // console.log(this.all_products[j]); //AQUII SE EMPIEZA A NOTAR EL CAMBIO DE AQUELLO QUE ES ALEATORIO
                  // console.log('======>',this.all_products.length);
                  // console.log('estee',this.productsById);

                }

              }
            }

          })
        });
      



      }
      }



  getProd() {
    this.productService.getAll().snapshotChanges().forEach(productSnapshot => {
      this.all_products = [];
      productSnapshot.forEach(productSnapshot => {
        // let prod = productSnapshot.payload.key
        let prod = productSnapshot.payload.toJSON();
        prod['$key'] = productSnapshot.key;
        // this.ids = prod['$key'];
        this.ids.push(prod['$key']);

        this.array.push(prod['$key']);
        
        // console.log(prod['$key']);
        // console.log(prod);
        
        // this.all_products.push(prod as Product);

        this.all_products.push(prod as Producto);

        // console.log(this.all_products);
        // console.log(this.all_products[0]['$key']);

        // console.log(this.ids);
      })

      // console.log(this.ids);
      // console.log(this.array);
    });
    // console.log(this.ids[0]);
    return this.ids;

  }

  get_ids(ids) {
    var array = [];
    // console.log(this.all_products.length);
    for (let index = 0; index < this.ids.length[0]; index++) {
      array.push(this.ids[index]['$key']);

    }

    // console.log(array); IMPORTANTE PARA NOTAR EL ARRAY CON SUS OBJETOS EN LA CONSOLA

  }
  

  ngOnInit(): void {
  }

}
