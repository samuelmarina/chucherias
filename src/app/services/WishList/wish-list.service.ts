import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import firebase from "firebase/app"
@Injectable({
  providedIn: 'root'
})
export class WishListService {

  

  

  constructor(private db: AngularFireDatabase) { }

  private getWishList(wLId: string) {
    return this.db.object("wish-list/" + wLId);
  }

  private createwL() {
    return this.db.list("/wish-list").push({
      dateCreated: new Date().getTime()
    })
  }

  private getwL(wLId: string) {
    return this.db.object("wish-list/" + wLId);
  }

  private async getOrCreateWLId() {
    let wLId = localStorage.getItem('wLId');
    if (wLId) return wLId;

    let res = await this.createwL();
    localStorage.setItem("wLId", res.key);
    return res.key;
  }




  // private async isProductAddedtoWL(ref: firebase.database.Reference) {
  //   let flag;
  //   await ref.once("value").then(res => {
  //     flag = res.exists();
  //   })
  //   return flag;
  // }

   async  isProductAddedtoWL(ref: firebase.database.Reference) {
    let flag;
    
    await ref.once("value").then(res => {
      flag = res.exists();
      
    })
    
    
    return flag;
  }

  async deleteAllWL(product:Producto,user:firebase.User){
    this.db.object("/users/" + user.uid + "/wish-list/" + "/products/").remove();
  }

  async deleteTWL (product:Producto, user:firebase.User){

    let item$ = this.db.list("/users/" + user.uid + "/wish-list/");

    let wLKey = item$.push({
      //  POR AHORA BORRAR
    }).key

    this.db.object("/users/" + user.uid + "/wish-list/" + "/products/" + product.key).remove();
    
      

  }

  async existe2(product:Producto, user: firebase.User){
    let ref = firebase.database().ref("/users/" + user.uid + "/wish-list/" + "/products/" + product.key);
    
    if (  await this.isProductAddedtoWL(ref)==true) {
      return true;
    }
    else {
      return false;
    }

  }

  async existe(product: Producto, user: firebase.User){
    let ref = firebase.database().ref("users/" + user + "/wish-list/" + "/products/");

  

    if (await this.isProductAddedtoWL(ref)) {
      return true;
  }
  else {
    return false;
  
}
  
}
    

  

  async addToWL(product: Producto, user: firebase.User) {

    let item$ = this.db.list("/users/" + user.uid + "/wish-list/");

    let wLKey = item$.push({
        //  POR AHORA BORRAR
      }).key

    this.db.object("/users/" + user.uid + "/wish-list/" + "/products/" + product.key)
        .set({
          product
        })

    // item$.snapshotChanges().pipe(take(1)).subscribe(async item=> {
    //   if(item.length === 0 || item[0].payload.val()['quantity'] === 2000){
    //     let bagKey = item$.push({
    //       quantity: 50,
    //       date: new Date().toString(),
    //     }).key

    //     this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey + "/products/" + product.key)
    //     .set({
    //       product, quantity: 50
    //     })
    //   }
    //   else{
    //     let bagKey = item[0].key;
    //     let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey
    //     + "/products/" + product.key);

    //     let bag = this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey)
    //     bag.valueChanges().pipe(take(1))
    //     .subscribe(x => {
    //       bag.update({
    //         quantity: x['quantity'] + 50
    //       })
    //     })

    //     if(await this.isProductAdded(ref)){
    //       ref.update({
    //         quantity: item[0].payload.val()['products'][product.key]['quantity'] + 50
    //       })
    //     }
    //     else{
    //       ref.set({
    //         product,
    //         quantity: 50
    //       })
    //     }
    //   }
    // }) //






    // item$.snapshotChanges().pipe(take(1)).subscribe(async item => {
    //   if (item.length === 0 || item[0].payload.val()['quantity'] === 2000) {
    //     let bagKey = item$.push({
    //       quantity: 50,
    //       date: new Date().toString(),
    //     }).key

    //     this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey + "/products/" + product.key)
    //       .set({
    //         product, quantity: 50
    //       })
    //   }
    //   else {
    //     let bagKey = item[0].key;
    //     let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey
    //       + "/products/" + product.key);

    //     let bag = this.db.object("/users/" + user.uid + "/shopping-bags/" + price + "/" + bagKey)
    //     bag.valueChanges().pipe(take(1))
    //       .subscribe(x => {
    //         bag.update({
    //           quantity: x['quantity'] + 50
    //         })
    //       })

    //     if (await this.isProductAdded(ref)) {
    //       ref.update({
    //         quantity: item[0].payload.val()['products'][product.key]['quantity'] + 50
    //       })
    //     }
    //     else {
    //       ref.set({
    //         product,
    //         quantity: 50
    //       })
    //     }
    //   }
    // })



  }


}
