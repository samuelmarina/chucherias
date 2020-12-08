import { Component, OnInit } from '@angular/core';
import { Product } from '../lista-productos/lista-productos.component';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-customer-tracking-list',
  templateUrl: './customer-tracking-list.component.html',
  styleUrls: ['./customer-tracking-list.component.css']
})
export class CustomerTrackingListComponent implements OnInit {
  orderID;
  user;
  orders=[];
  order={
    date:'',
    paymentMethod: "",
    pedido: [],
    retiro: "",
    status: "",
    totalPayment: 0,
    userId: "",
    userName:''
  };
  


  id;
  idFromUrl
  lista_productos: Producto[] = [];
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
  lista = [];
  lista2 = [];
  all_products = [];
  totalgr: number = 0;
  nProducts: number = 0;
  ProductPrice: number = 0;
  totalToPay: number = 0;
  order2;
  nPedidos: any;
  constructor(
              private auth: AuthService,
              private UserS:UserService,
              private ProductS:ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private orderS: OrderService,
              private db: AngularFireDatabase
              ) {
                
    this.orderID = window.location.href.split('/')[window.location.href.split('/').length-1];
    // console.log(this.orderID);
    
    this.auth.user$.subscribe(async user => {
      this.user = user;
      this.UserS.getOrderByID2(user, this.orderID).snapshotChanges().subscribe(c=>{
        c.forEach(async res=>{
          // console.log(res.key, res.payload.val());
          this.order[res.key]=res.payload.val();
          // console.log(this.order);
          
          this.nPedidos = 0;
          for (let index = 0; index < this.order['pedido'].length; index++) {
            this.nPedidos += this.order['pedido'][index]['quantity'];

          }
        })
      });
      
      // console.log(this.nPedidos/50);
      // this.UserS.getNPedidosInOrder(user, this.orderID).snapshotChanges().subscribe(c=>{
      //   // console.log(c.length);
      //   this.nPedidos=c.length;
      //   c.forEach(res=>{
      //     console.log(res.payload.val()[res.key]['quantity']);
      //   })
      // })


    })

    



  }

  ngOnInit(): void {
  }

}




   