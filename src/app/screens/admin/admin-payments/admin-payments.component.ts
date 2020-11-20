import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  elementData = [];
  displayedColumns: string[] = ["name", "edit"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService
  ) {
    this.paymentService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => c))
    )
    .subscribe(c => {
      c.map(k => {
        this.elementData.push({
          key: k.key,
          ...k.payload.val() as any
        })
      })
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.paginator = this.paginator;
    })
   }

  ngOnInit(): void {
  }

}
