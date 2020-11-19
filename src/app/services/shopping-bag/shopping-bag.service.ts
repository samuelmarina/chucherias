import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import firebase from "firebase/app"

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

  // private getBag(bagId: string){
  //   return this.db.object("shopping-bags/" + bagId);
  // }

  getBag(user: firebase.User){
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
    let price = product.price.toString().replace(".", ",");
    let item$ = this.db.list("/users/" + user.uid + "/shopping-bags/" + price, ref => ref.orderByChild('quantity'));

    item$.snapshotChanges().pipe(take(1)).subscribe(async item=> {
      if(item.length === 0 || item[0].payload.val()['quantity'] === 2000){
        let bagKey = item$.push({
          quantity: 50,
          date: new Date().toString(),
        }).key

        this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey + "/products/" + product.key)
        .set({
          product, quantity: 50
        })
      }
      else{
        let bagKey = item[0].key;
        let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey
        + "/products/" + product.key);

        let bag = this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey)
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
    let price = product.price.toString().replace(".", ",");
    let item$ = this.db.list("/users/" + user.uid + "/shopping-bags/" + price, ref => ref.orderByChild('quantity'));

    item$.snapshotChanges().pipe(take(1)).subscribe(async item => {
      let bagKey = item[0].key;
      
      let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey
      + "/products/" + product.key);

      let productoQty = item[0].payload.val()['products'][product.key]['quantity'];
      if(productoQty === 50){
        ref.remove();
      }
      else{
        ref.update({
          quantity: item[0].payload.val()['products'][product.key]['quantity'] - 50
        })
      }

      if(item[0].payload.val()['quantity'] === 50){
        return firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey).remove();
      }

      ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey);

      ref.update({
        quantity: item[0].payload.val()['quantity'] - 50
      })
    })
  }

  private async isProductAdded(ref: firebase.database.Reference) {
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }
}
