import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private db: AngularFireDatabase
  ) { }

  save(user: firebase.User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email
    });

    
  };

  getOrderByID(user:firebase.User,orderID:string){
    return this.db.list("/users/" + user.uid + "/orders/"+orderID);
  }
  getAllOrders(user:firebase.User) {
    return this.db.list("/users/" + user.uid+ "/orders");
  }
}
