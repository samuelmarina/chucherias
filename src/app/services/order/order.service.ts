import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list("/orders");
  }

  get(orderId) {
    return this.db.object("/orders/" + orderId);
  }

  update(orderId, order) {
    return this.db.object("/orders/" + orderId).update(order);
  }
}
