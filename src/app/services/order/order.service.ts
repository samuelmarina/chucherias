import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  user;
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
    ) { 
      this.auth.user$.subscribe(user => {
        if(user) this.user = user;
      })
    }

  create(order){
    let key = this.db.list("/users/" + this.user.uid + "/orders").push({order}).key;
    return this.db.list("/orders").set(key, {order});
  }

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
