import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from "../../services/category/category.service"

@Component({
  selector: 'category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  categories$;
  @Input("category") category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, name: c.payload.val()})))
    )
  }

  ngOnInit(): void {
  }

}
