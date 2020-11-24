import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { RetiroService } from 'src/app/services/retiro/retiro.service';

@Component({
  selector: 'app-admin-retiros',
  templateUrl: './admin-retiros.component.html',
  styleUrls: ['./admin-retiros.component.css']
})
export class AdminRetirosComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  elementData = [];
  displayedColumns: string[] = ["name", "edit"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private retiroService: RetiroService
  ) {
    this.retiroService.getAll().snapshotChanges().pipe(
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
