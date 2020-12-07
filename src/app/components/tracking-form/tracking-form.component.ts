import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'firebase';
@Component({
  selector: 'app-tracking-form',
  templateUrl: './tracking-form.component.html',
  styleUrls: ['./tracking-form.component.css']
})
export class TrackingFormComponent implements OnInit {
  products$;
  dataSource: MatTableDataSource<any>;
  elementData = [];
  ids = [];
  user: User;
  orders=[];
  

  displayedColumns: string[] = ['Fecha', 'Estado', 'Orden ID', 'Chequear Orden'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private UserS:UserService,
    private auth: AuthService) {
    this.auth.user$.subscribe(async user => {
      this.user = user;
      await this.UserS.getAllOrders(user).snapshotChanges().subscribe(async c=>{
        // console.log(c[0].payload.val())
        // this.orders.push(c);
        await c.forEach(async order=>{
          // console.log(order.payload.val())
          let ord = order.payload.val()['order'];
          ord['key']=order.key.toString();
          await this.orders.push(ord);
          // console.log(this.orders);
        })
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        
      });

     }

    )};



  ngOnInit(): void {
  }

}
