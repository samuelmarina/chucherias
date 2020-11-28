import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import firebase, { User } from "firebase/app"
@Injectable({
  providedIn: 'root'
})
export class WishListService {

  

  

  constructor(private db: AngularFireDatabase) { }

  private getWishList(wLId: string) {
    return this.db.object("wish-list/" + wLId);
  }
   getWishListUser(user:User) {

    // let item$ = this.db.list("/users/" + user.uid + "/wish-list/");
    // return this.db.object("/users/"+user.uid+"/wish-list/products" );
    return this.db.list("/users/"+user.uid+"/wish-list/products" );

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

  async deleteAllWL(user:firebase.User){
    this.db.object("/users/" + user.uid + "/wish-list/" + "/products/").remove();
  }

  async deleteTWL (product:Producto, user:firebase.User){

    let item$ = this.db.list("/users/" + user.uid + "/wish-list/");

    

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

    console.log(product.key);
    this.db.object("/users/" + user.uid + "/wish-list/" + "/products/" + product.key)
        .set({
          product
        })

   

  }


}
