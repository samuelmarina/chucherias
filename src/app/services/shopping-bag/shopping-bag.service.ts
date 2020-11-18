import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list("/shopping-bags").push({
      dateCreated: new Date().getTime()
    })
  }
}
