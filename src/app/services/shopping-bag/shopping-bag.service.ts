
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map, switchMap, take } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import firebase from "firebase/app"
import { ShoppingBag, uiShoppingBag } from 'src/app/schemas/shopping-bag';
import { Product } from 'src/app/screens/lista-productos/lista-productos.component';
// import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {
  quantityProduct: unknown;
  // contador = timer(1000);
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list("/shopping-bags").push({
      dateCreated: new Date().getTime()
    })
  }

  async removeBag(bag: uiShoppingBag, user: firebase.User) {
    let refTotalQty = firebase.database().ref("/users/" + user.uid + "/shopping-bags/quantity");
    let newQty = await this.updateTotalQty(refTotalQty, bag.quantity, user.uid);

    if (newQty === 0) {
      return this.db.object("/users/" + user.uid + "/shopping-bags").remove();
    }

    return this.db.object("/users/" + user.uid + "/shopping-bags/items/" + bag.price +
      "/bags/" + bag.key).remove();
  }

  private async updateTotalQty(refTotalQty: firebase.database.Reference, qtyToRemove: number, userId: string) {
    let totalQty;
    await refTotalQty.once("value").then(res => {
      totalQty = res.val();

    })
    let newQty = totalQty - (qtyToRemove / 50)

    firebase.database().ref("/users/" + userId + "/shopping-bags").update({ quantity: newQty })

    return newQty;
  }


  getBag(user: firebase.User): AngularFireObject<ShoppingBag> {
    return this.db.object("/users/" + user.uid + "/shopping-bags");
  }

  private async createOrUpdateBag(user: firebase.User, action: string) {
    try {


      let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
      let bagExist = await this.isBagCreated(ref);

      if (bagExist) {
        let bag$ = this.db.object("/users/" + user.uid + "/shopping-bags/");
        bag$.valueChanges().pipe(take(1)).subscribe(async bag => {
          if (action === "add") {
            bag$.update({
              quantity: bag['quantity'] + 1
            })
          }
          else {
            if (bag['quantity'] === 1) return ref.remove();

            //QUITAR EL AWAIT?
            await bag$.update({
              quantity: bag['quantity'] - 1
            })
          }
        })
      }
      else {
        if (action == 'add') {
          ref.set({
            quantity: 1
          })
        }
      }
    } catch (error) {
      // console.log('error');
    }
  }

  private async isBagCreated(ref: firebase.database.Reference) {
    let flag;
    await ref.once("value").then(res => {
      flag = res.exists();
    })
    return flag;
  }

  getQuantityProduct(product: Producto) {
    return product.quantity;
  }


  async existeBolsaConSpecifProduct(user: firebase.User, product: Producto) {
    let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
    let bagExist = await this.isBagCreated(ref);

    if (bagExist) {
      let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
      let prodExist = await this.isBagCreated(ref);

    }

  }


  isAvailableQuantityProduct(product: Producto) {
    return product.quantity > 0;
  }
  async addToBag(product: Producto, user: firebase.User) {
    try {
      await this.createOrUpdateBag(user, "add");
      let price = this.getPrice(product);
      let item$ = this.getItem(user.uid, price);

      await item$.snapshotChanges().pipe(take(1)).subscribe(async item => {

        if (item.length === 0 || item[0].payload.val()['quantity'] === 2000) {
          let bagKey = item$.push({
            quantity: 50,
            date: new Date().toString(),
          }).key

          //ACTUALIZAR TODO
          // product.quantity -= await 50;
          // this.db.object("/products/" + product.key).update(product);

          this.db.object("/users/" + user.uid + "/shopping-bags/items/" + price + "/bags/" + bagKey + "/products/" +
            product.key)
            .set({
              product, quantity: 50
            }).then(() => { return true })
        }
        else {
          let bagKey = item[0].key;
          let ref = this.getProductRef(user.uid, price, bagKey, product);

          let bag = this.db.object("/users/" + user.uid + "/shopping-bags/items/" + price + "/bags/" + bagKey)
          bag.valueChanges().pipe(take(1))
            .subscribe(x => {
              bag.update({
                quantity: x['quantity'] + 50
              }).then(() => { return true })
            })

          await this.db.object("/products/" + product.key).snapshotChanges().subscribe(async c => {
            // console.log(c.payload.val()['quantity']) IMPORTANTE
            // if (c.payload.val()['quantity']=='quantity'){
            // console.log('cantidad==>',c.payload.val())
            // }
          });

          
          //ACTUALIZAR PRODUCTO
          // product.quantity -= await 50;
          // await this.db.object("/products/" + product.key).update(product);

          if (await this.isProductAdded(ref)) {
            ref.update({
              quantity: await item[0].payload.val()['products'][product.key]['quantity'] + 50
            }).then(() => { return true })
          }
          else {
            ref.set({
              product,
              quantity: 50
            }).then(() => { return true })
          }
        }
      })
    } catch (error) {
      return false;
    }
    return true; //SINO FUNCIONA CAMBIAR A TRUE
  }

  async removeFromBag(product: Producto, user: firebase.User) {
    // this.createOrUpdateBag(user, "remove");
    let price = this.getPrice(product);
    let item$ = this.getItem(user.uid, price);

    let deleteOnce = 0;
    item$.snapshotChanges().pipe(take(1)).subscribe(async item => {

      try {
        let bagKey = item[0].key;
        let ref = this.getProductRef(user.uid, price, bagKey, product);

        this.db.list("/users/" + user.uid + "/shopping-bags/items/" + price + "/bags/" + bagKey
          + "/products/" + product.key).snapshotChanges().subscribe(c => {
            (c.map(async k => {
              // console.log(k.payload.key)
              if (k.payload.key == 'quantity') {
                this.quantityProduct = k.payload.val();

                console.log(this.quantityProduct);

              }

              // console.log(this.getQuantityProductRef(user.uid, product.price.toString(), bagKey, product).key);
              // let quantytyProduct=this.getQuantityProductRef(user.uid, product.price.toString(), bagKey, product).key;
              if (await this.isProductAdded(ref) && this.quantityProduct > 0) {
                if (deleteOnce < 1) {
                  this.createOrUpdateBag(user, "remove"); 
                  deleteOnce++; 
                  
                  //ACTUALIZAR PRODUCTO 
                  // product.quantity+=await 50; 
                  // await this.db.object("/products/" + product.key).update(product); 


                  let productoQty = await item[0].payload.val()['products'][product.key]['quantity']; 
                  if (productoQty === 50) { ref.remove(); 
                  
                  } else {
                      
                    ref.update({ quantity: await item[0].payload.val()['products'][product.key]['quantity'] - 50 })
                    
                    } 
                    let bagRef = await this.getBagRef(user.uid, price, bagKey); 
                    if (item[0].payload.val()['quantity'] === 50) return bagRef.remove(); 
                    
                    bagRef.update({ quantity: await item[0].payload.val()['quantity'] - 50 }).then(() => {
                    return true
                  })

                }


              }



            }))


            // console.log(c)

          });


        // // console.log(this.getQuantityProductRef(user.uid, product.price.toString(), bagKey, product).key);
        // // let quantytyProduct=this.getQuantityProductRef(user.uid, product.price.toString(), bagKey, product).key;
        // if (await this.isProductAdded(ref)) {

        // //ACTUALIZAR PRODUCTO
        // product.quantity += await 50;
        // await this.db.object("/products/" + product.key).update(product);


        // let productoQty = item[0].payload.val()['products'][product.key]['quantity'];
        // if (productoQty === 50) {
        // ref.remove();
        // }
        // else {
        // ref.update({
        // quantity: await item[0].payload.val()['products'][product.key]['quantity'] - 50
        // })
        // }

        // let bagRef = this.getBagRef(user.uid, price, bagKey);

        // if (item[0].payload.val()['quantity'] === 50) return bagRef.remove();

        // bagRef.update({
        // quantity: await item[0].payload.val()['quantity'] - 50
        // })

        // }

      } catch (error) {
        // console.log('Ya no hay mas productos de ese tipo');
        return false
      }

    })

    return true; //SINO FUNCIONA CAMBIAR A TRUE
  }

  private parseString(str: string) {
    return Number(str.replace(",", "."));
  }

  private getItem(userId: string, price: string) {
    return this.db.list("/users/" + userId + "/shopping-bags/items/" + price + "/bags", ref =>
      ref.orderByChild('quantity'))
  }

  private getPrice(product: Producto) {
    return product.price.toString().replace(".", ",");
  }

  //USAR ESTE COMO PLAN B
  // private getQuantityProductRef(userId: string, price: string, bagKey: string, product: Producto) {
  // return firebase.database().ref("/users/" + userId + "/shopping-bags/items/" + price + "/bags/" + bagKey
  // + "/products/" + product.quantity);
  // }

  private getQuantityProductRef(userId: string, price: string, bagKey: string, product: Producto) {
    return firebase.database().ref("/users/" + userId + "/shopping-bags/items/" + price + "/bags/" + bagKey
      + "/products/" + product.key + product.quantity);
  }


  private getProductRef(userId: string, price: string, bagKey: string, product: Producto) {
    return firebase.database().ref("/users/" + userId + "/shopping-bags/items/" + price + "/bags/" + bagKey
      + "/products/" + product.key);
  }

  private getBagRef(userId: string, price: string, bagKey: string) {
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



