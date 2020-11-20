import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', ref => ref.orderByChild("name"));
  }

  create(category: string) {
    let key = category.toLowerCase();
    return this.db.list('/categories').set(key, {name: category});
  }

  getCategory(categoryId){
    return this.db.object("/categories/" + categoryId);
  }

  update(categoryId, category){
    return this.db.object("/categories/" + categoryId).update(category)
  }

  delete(categoryId){
    return this.db.object("/categories/" + categoryId).remove();
  }
}
