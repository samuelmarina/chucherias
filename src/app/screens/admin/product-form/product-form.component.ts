import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, name: c.payload.val()})))
    )
  }

  ngOnInit(): void {
  }

}
