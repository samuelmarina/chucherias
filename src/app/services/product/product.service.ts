import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database"
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Product} from '../../screens/lista-productos/lista-productos.component';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase,
              private firestore: AngularFirestore
              
              ) {
  }
    

  

  // public getAllproducts() {
  //   return this.firestore.collection('/products').snapshotChanges();
  // }

  create(product){
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db.list("/products");
  }

  getProduct(productId){
    return this.db.object("/products/" + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId){
    return this.db.object("/products/" + productId).remove();
  }

  

  getNAleatoryProducts(n:number,allElementos) {
    // console.log(allElementos.length);
    var myArray = [];
    while (myArray.length < n) {
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
    console.log("números aleatorios : " + myArray);

    


    // for (let index = 0; index < n; index++) {
    //   numero=  Math.round((Math.random() * (allElementos.lenght - 1) + 1));
    //   console.log(numero);
    //   console.log('debio imprimir el numero aqui');
    //   products.push(allElementos[numero]);
      
    // }
    
    return myArray;
  
  }

}
