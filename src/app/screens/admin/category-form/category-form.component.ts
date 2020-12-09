import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category = {
    key: null,
    name: ""
  }
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.categoryService.getCategory(this.id).snapshotChanges().pipe(take(1))
      .subscribe(category => {
        this.category = {
          key: category.key,
          ...category.payload.val() as any
        }
      })
    }
  }

  ngOnInit(): void {
  }

  save(form){
    if(form.name === "") return alert("Error: tiene que introducir un nombre a la categoría");
    if(this.id){
      this.categoryService.update(this.id, form);
    }
    else{
      this.categoryService.create(form.name);
    }
    this.router.navigate(['admin/categories']);
  }

  delete() {
    if(confirm("Está seguro que desea eliminar la categoría?")){
      this.categoryService.delete(this.id);
      this.router.navigate(['admin/categories']);
    }
  }

}
