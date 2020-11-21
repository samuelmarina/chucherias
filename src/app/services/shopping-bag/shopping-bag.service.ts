import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map, switchMap, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import firebase from "firebase/app"
import { ShoppingBag, uiShoppingBag } from 'src/app/schemas/shopping-bag';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list("/shopping-bags").push({
      dateCreated: new Date().getTime()
    })
  }

  async removeBag(bag: uiShoppingBag, user: firebase.User){
    let refTotalQty = firebase.database().ref("/users/" + user.uid + "/shopping-bags/quantity");
    let newQty = await this.updateTotalQty(refTotalQty, bag.quantity, user.uid);
    
    if(newQty === 0) {
      return this.db.object("/users/" + user.uid + "/shopping-bags").remove();
    }

    return this.db.object("/users/" + user.uid + "/shopping-bags/items/" + bag.price + 
    "/bags/" + bag.key).remove();
  }

  private async updateTotalQty(refTotalQty: firebase.database.Reference, qtyToRemove: number, userId: string){
    let totalQty;
    await refTotalQty.once("value").then(res => {
      totalQty = res.val();

    })
    let newQty = totalQty - (qtyToRemove/50)

    firebase.database().ref("/users/" + userId + "/shopping-bags").update({quantity: newQty})

    return newQty;
  }
  

  getBag(user: firebase.User): AngularFireObject<ShoppingBag>{
    return this.db.object("/users/" + user.uid + "/shopping-bags");
  }

  private async createOrUpdateBag(user: firebase.User, action: string){
    let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
    let bagExist = await this.isBagCreated(ref);

    if(bagExist){
      let bag$ = this.db.object("/users/" + user.uid + "/shopping-bags/");
      bag$.valueChanges().pipe(take(1)).subscribe(bag => {
        if(action === "add"){
            bag$.update({
            quantity: bag['quantity'] + 1
          })
        }
        else{
          if(bag['quantity'] === 1) return ref.remove();

          bag$.update({
            quantity: bag['quantity'] - 1
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

  private async isBagCreated(ref: firebase.database.Reference){
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }

  async addToBag(product: Producto, user: firebase.User) {
    this.createOrUpdateBag(user, "add");
    let price = this.getPrice(product);
    let item$ = this.getItem(user.uid, price);

    item$.snapshotChanges().pipe(take(1)).subscribe(async item=> {
      if(item.length === 0 || item[0].payload.val()['quantity'] === 2000){
        let bagKey = item$.push({
          quantity: 50,
          date: new Date().toString(),
        }).key

        this.db.object("/users/" + user.uid + "/shopping-bags/items/" + price + "/bags/" + bagKey + "/products/" + product.key)
        .set({
          product, quantity: 50
        })
      }
      else{
        let bagKey = item[0].key;
        let ref = this.getProductRef(user.uid, price, bagKey, product);

        let bag = this.db.object("/users/" + user.uid + "/shopping-bags/items/" + price + "/bags/" + bagKey)
        bag.valueChanges().pipe(take(1))
        .subscribe(x => {
          bag.update({
            quantity: x['quantity'] + 50
          })
        })

        if(await this.isProductAdded(ref)){
          ref.update({
            quantity: item[0].payload.val()['products'][product.key]['quantity'] + 50
          })
        }
        else{
          ref.set({
            product,
            quantity: 50
          })
        }
      }
    })
  }

  removeFromBag(product: Producto, user: firebase.User){
    this.createOrUpdateBag(user, "remove");
    let price = this.getPrice(product);
    let item$ = this.getItem(user.uid, price);

    item$.snapshotChanges().pipe(take(1)).subscribe(async item => {
      let bagKey = item[0].key;
      
      let ref = this.getProductRef(user.uid, price, bagKey, product);

      let productoQty = item[0].payload.val()['products'][product.key]['quantity'];
      if(productoQty === 50){
        ref.remove();
      }
      else{
        ref.update({
          quantity: item[0].payload.val()['products'][product.key]['quantity'] - 50
        })
      }

      let bagRef = this.getBagRef(user.uid, price, bagKey);

      if(item[0].payload.val()['quantity'] === 50) return bagRef.remove();

      bagRef.update({
        quantity: item[0].payload.val()['quantity'] - 50
      })
    })
  }

  private parseString(str: string){
    return Number(str.replace(",", "."));
  }

  private getItem(userId: string, price: string){
    return this.db.list("/users/" + userId + "/shopping-bags/items/" + price + "/bags", ref => ref.orderByChild('quantity'))
  }

  private getPrice(product: Producto){
    return product.price.toString().replace(".", ",");
  }

  private getProductRef(userId: string, price: string, bagKey: string, product: Producto){
    return firebase.database().ref("/users/" + userId + "/shopping-bags/items/" + price + "/bags/" + bagKey
      + "/products/" + product.key);
  }

  private getBagRef(userId: string, price: string, bagKey: string){
    return firebase.database().ref("/users/" + userId + "/shopping-bags/items/" + price + "/bags/" + bagKey)
  }

  private async isProductAdded(ref: firebase.database.Reference) {
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }
}
