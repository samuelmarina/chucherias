import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { StatusService } from 'src/app/services/status/status.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  statuses$;
  id;
  order = {
    client: "",
    total: 0,
    status: "",
  };
  pedido = []
  displayedColumns: string[] = ["cantidad", "nombre", "costo"]
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private orderService: OrderService) { 

    this.statuses$ = statusService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() as any})))
    )

    this.id = this.route.snapshot.paramMap.getAll("id");
    if(this.id) {
      this.orderService.get(this.id).valueChanges().pipe(take(1))
      .subscribe(order => {
        this.order['client'] = order['cliente']
        this.order['total'] = order['total']
        this.order['status'] = order['status']
        order['Pedido'].forEach(x => {
          if(x){
            this.pedido.push(x);
          }
          
        })
        this.dataSource = new MatTableDataSource(this.pedido)
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  ngOnInit(): void {
  }

  save(form) {

  }

}
