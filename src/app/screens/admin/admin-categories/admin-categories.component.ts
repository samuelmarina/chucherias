import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  elementData = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["name", "edit"];

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().snapshotChanges().pipe(
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
