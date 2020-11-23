import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from "firebase/app"
import { take } from 'rxjs/operators';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { ShoppingCart} from "src/app/schemas/shopping-cart"

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getCart(user: firebase.User): AngularFireObject<ShoppingCart>{
    return this.db.object("/users/" + user.uid + "/shopping-cart");
  }

  addToCart(bag: uiShoppingBag, user: firebase.User){
    this.updateCart(user, "add");
    return this.db.list("/users/" + user.uid + "/shopping-cart/bags").push({
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
      ref.update({
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
