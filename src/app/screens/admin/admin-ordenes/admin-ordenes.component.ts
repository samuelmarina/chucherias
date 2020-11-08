import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-ordenes',
  templateUrl: './admin-ordenes.component.html',
  styleUrls: ['./admin-ordenes.component.css']
})
export class AdminOrdenesComponent implements OnInit {
  elementData = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["client", "date", "edit"]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrderService) { 
     this.orderService.getAll().snapshotChanges()
    .subscribe(c => {
      c.map(k => {
        this.elementData.push({
          key: k.key,
          ...k.payload.val() as any
        })
      })
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
  }

}
