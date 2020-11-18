import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
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

  private getBag(bagId: string){
    return this.db.object("shopping-bags/" + bagId);
  }

  private async getOrCreateBagId(){
    let bagId = localStorage.getItem('bagId');
    if(bagId) return bagId;
    
    let res = await this.create();
      localStorage.setItem("bagId", res.key);
      return res.key;
  }

  async addToBag(product: Producto) {
    let bagId = await this.getOrCreateBagId();
    let price = product.price.toString().replace(".", ",");
    let item$ = this.db.object("/shopping-bags/" + bagId + "/items/" + price);
    let product$ = this.db.object("/shopping-bags/" + bagId + "/items/" + price + "/products/" + product.key);
    let ref = firebase.database().ref("/shopping-bags/" + bagId + "/items/" + price + "/products/" + product.key);
    let isProductAdded = await this.isProductAdded(ref);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if(!item) {
        item$.set({
          quantity: 50
        })
        product$.set({
          product: product
        })
        
      }
      else{
        item$.update({
          quantity: item['quantity'] + 50
        })
        if(!isProductAdded){
          product$.set({
            product: product
          })
        }
      }
    });
  }

  private async isProductAdded(ref: firebase.database.Reference) {
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }
}
