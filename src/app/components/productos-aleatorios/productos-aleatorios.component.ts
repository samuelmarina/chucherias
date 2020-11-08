import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { Product} from '../../screens/lista-productos/lista-productos.component';
@Component({
  selector: 'app-productos-aleatorios',
  templateUrl: './productos-aleatorios.component.html',
  styleUrls: ['./productos-aleatorios.component.css']
})
export class ProductosAleatoriosComponent implements OnInit {
  products: any[] = [];
  filteredProducts = [];
  productsById: any[] = [];
  productosHome: any[] = [];
  al: string;
  arr = [];
  route: ActivatedRoute;
  all_products = [];



  ids = [];
  product;
  aleatoryProducts;
  n_aleatory_products = 6;
  category: string;
  numero: number;
  array: string[] = [];
  constructor(route: ActivatedRoute,
    private productService: ProductService) {
     {
      console.log('AQUI');
      this.ids = this.getProd();
      console.log('ids');

      // console.log(this.ids.length);
      // console.log((this.ids));

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



      this.productService.getAll().valueChanges().pipe(
        map(changes => changes.map(c => c))
      )
        .subscribe(c => {
          c.map(k => this.all_products.push(k))
          this.arr = productService.getNAleatoryProducts(this.n_aleatory_products, this.all_products);
          console.log(this.arr);
          console.log(this.all_products[1]);


          route.queryParamMap.subscribe(params => {
            var n = this.arr.length;
            // this.arr=this.arr.sort();
            console.log(this.arr);

            for (let i = 0; i < this.arr.length; i++) {

              for (let j = 0; j < this.all_products.length; j++) {

                if (this.arr[i] == j) {
                  console.log(this.arr[i]);
                  this.al = params.get('id');
                  // console.log(this.al);
                  this.productsById = this.al ?
                  this.all_products.filter(p => p['id'] === this.al) :
                  this.all_products;

                  this.productosHome.push(this.all_products[j]);
                  console.log(this.all_products[j]); //AQUII SE EMPIEZA A NOTAR EL CAMBIO DE AQUELLO QUE ES ALEATORIO
                  // console.log('======>',this.all_products.length);
                  // console.log('estee',this.productsById);

                }

              }
            }

          })
        });}
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
        // console.log(prod);

        this.all_products.push(prod as Product);

        // console.log(this.all_products);
        // console.log(this.all_products[0]['$key']);

        // console.log(this.ids);
      })

      // console.log(this.ids);
      // console.log(this.array);
    });

    return this.ids;

  }

  get_ids(ids) {
    var array = [];
    // console.log(this.all_products.length);
    for (let index = 0; index < this.ids.length[0]; index++) {
      array.push(this.ids[index]['$key']);

    }

    console.log(array);

  }
  

  ngOnInit(): void {
  }

}
