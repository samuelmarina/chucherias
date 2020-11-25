import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app"
import { take } from 'rxjs/operators';
import { uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { ShoppingCart} from "src/app/schemas/shopping-cart"

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase,
    private db2: AngularFirestore
  ) { }

  getCart(user: firebase.User): AngularFireObject<ShoppingCart>{
    return this.db.object("/users/" + user.uid + "/shopping-cart");
  }

  getCart2(user: firebase.User): AngularFireList<ShoppingCart>{
    return this.db.list("/users/" + user.uid + "/shopping-cart");
  }

  removeCart(user: firebase.User){
    return this.db.object("/users/" + user.uid + "/shopping-cart").remove();
  }

  async removeBag(bag: uiShoppingBag, user: firebase.User){
    let refTotalQty = firebase.database().ref("/users/" + user.uid + "/shopping-cart/quantity");
    let newQty = await this.updateTotalQty(refTotalQty, user.uid);

    // if(newQty === 0) {
    //   return this.db.object("/users/" + user.uid + "/shopping-cart").remove();
    // }
    return this.db.object("/users/" + user.uid + "/shopping-cart/bags/" + bag.key).remove();
  }

  private async updateTotalQty(refTotalQty: firebase.database.Reference, userId: string){
    let totalQty;
    await refTotalQty.once("value").then(res => {
      totalQty = res.val();

    })
    let newQty = totalQty - 1;

    firebase.database().ref("/users/" + userId + "/shopping-cart").update({quantity: newQty})

    return newQty;
  }

  addToCart(bag: uiShoppingBag, user: firebase.User){
    this.updateCart(user, "add");
    return this.db.object("/users/" + user.uid + "/shopping-cart/bags/" + bag.key).set({
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
