import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app"
import { take } from 'rxjs/operators';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addToCart(bag: uiShoppingBag, user: firebase.User){
    this.updateCart(user, "add");
    return this.db.list("/users/" + user.uid + "/shopping-cart").push({
      bag
    });
  }

  private async updateCart(user: firebase.User, action: string){
    let ref = firebase.database().ref("/users/" + user.uid + "/shopping-cart");
    let cartExists = await this.isCartCreated(ref);

    if(cartExists){
      let cart$ = this.db.object("/users/" + user.uid + "/shopping-cart");
      cart$.valueChanges().pipe(take(1)).subscribe(cart => {
        if(action === "add"){
          cart$.update({
            quantity: cart['quantity'] + 1
          })
        }
        else{
          if(cart['quantity'] === 1) return ref.remove();

          cart$.update({
            quantity: cart['quantity'] - 1
          })
        }
      })
    }
    else{
      ref.set({
        quantity: 1
      })
    }
  }

  private async isCartCreated(ref: firebase.database.Reference){
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }
}
