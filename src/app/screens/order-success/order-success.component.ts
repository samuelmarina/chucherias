import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  id;

  user;
  idFromUrl
  lista_productos:Producto[]=[];
  // data = {
  //   userId: '',
  //   userName: '',
  //   retiro: '',
  //   paymentMethod: '',
  //   status:'',
  //   totalPayment:'',
  //   date:'',
  //   pedido:[]
  // }
  data = {};
  order;
  lista=[];
  lista2=[];
  all_products=[];
  totalgr:number=0;
  nProducts: number=0;
  ProductPrice: number=0;
  totalToPay:number=0;
  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private orderS:OrderService,
    private db: AngularFireDatabase) { 
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap.get('name'));
    this.auth.user$.subscribe(async user => {
      if (user) {
        this.user = user;

    
        this.idFromUrl=this.router.url.split('/')[(this.router.url.split('/').length)-1];
        // console.log(this.idFromUrl);

        this.order =  await this.db.object('/orders/' + this.idFromUrl+'/order').valueChanges().subscribe( async c=>{
          
          this.lista.push(c);
          for (let x = 0; x < this.lista.length; x++) {
            // console.log(this.lista[x])

            for (let y in this.lista[x]) {
              // const element = ;
              // console.log(this.lista[x][y])
              this.lista2.push(this.lista[x][y]);
            }
            // const element = this.lista[x];
            
          }
        
          // console.log(this.lista2[2]);

          for (let x = 0; x < this.lista2[2].length; x++) {
            this.all_products.push(this.lista2[2][x]);

          }
          
          for (let index = 0; index < this.all_products.length; index++) {
            // console.log(this.all_products[index]);
            this.totalgr+=parseInt(this.all_products[index]['quantity']);
            // console.log(this.all_products[index]['quantity']);
            
          }
          // console.log(this.totalgr);
          // this.ProductPrice = parseInt(this.all_products[0]['price']);
          // this.totalToPay = this.lista2[5] * this.all_products[0]['price'];
          // console.log(typeof (this.lista2[5]))
          // console.log((this.lista2[5]))
          // console.log(this.lista2)
        });
        
        
    
      }

  })

}

 


  ngOnInit(): void {
  }

}
