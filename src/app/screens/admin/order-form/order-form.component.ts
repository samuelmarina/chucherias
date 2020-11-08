import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  statuses$;
  id;
  order;

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
        this.order['pedido'] = order['pedido']
      })
    }
  }

  ngOnInit(): void {
  }

  save(form) {

  }

}
