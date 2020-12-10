import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database"
import { AngularFirestore} from '@angular/fire/firestore';
import firebase from "firebase/app"
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  user;
  
  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private auth: AuthService
    ) {
      this.auth.user$.subscribe(user => {
        if(user) this.user = user;
      })
  }
    

  create(product){
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db.list("/products");
  }

  getProduct(productId){
    return this.db.object("/products/" + productId);
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId){
    return this.db.object("/products/" + productId).remove();
  }

  reduceQuantity(product){
    let ref = firebase.database().ref("/products/" + product['key'] + "/quantity");
    this.updateTotalQty(ref, product['quantity'], this.user.uid, product['key'])

  }

  async updateQuantity(product, type: string){
    let amount = await this.isEnoughProduct(product);
    if(type === 'remove'){
      return firebase.database().ref("/products/" + product['key']).update({quantity: amount + 50});
    }
    firebase.database().ref("/products/" + product['key']).update({quantity: amount - 50});
      
    return amount === 50 ? false : true;
  }

  private async isEnoughProduct(product){
    let amount;
    let ref = firebase.database().ref("/products/" + product['key'] + "/quantity");
    await ref.once("value").then(res => {
      amount = res.val();
    })

    return amount;
  }

  private async updateTotalQty(refTotalQty: firebase.database.Reference, qtyToRemove: number, userId: string, productKey: string){
    let totalQty;
    await refTotalQty.once("value").then(res => {
      totalQty = res.val();

    })
    let newQty = totalQty - qtyToRemove;


    firebase.database().ref("/products/" + productKey).update({quantity: newQty})
  }

  

  getNAleatoryProducts(n:number,allElementos) {
    // console.log(allElementos.length);
    var myArray = [];

    while (myArray.length <n ) {  
      var numeroAleatorio = Math.ceil(Math.random() * allElementos.length);
      var existe = false;
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] == numeroAleatorio) {
          existe = true;
          break;
        }
      }
      if (!existe) {
        myArray[myArray.length] = numeroAleatorio;
      }
      
    }
    // console.log("números aleatorios : " + myArray);

    


    // for (let index = 0; index < n; index++) {
    //   numero=  Math.round((Math.random() * (allElementos.lenght - 1) + 1));
    //   console.log(numero);
    //   console.log('debio imprimir el numero aqui');
    //   products.push(allElementos[numero]);
      
    // }
    
    
    return myArray;
  
  }

}
