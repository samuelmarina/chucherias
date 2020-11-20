import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list("/payments");
  }

  getPayment(paymentId: string){
    return this.db.object("/payments/" + paymentId);
  }

  create(payment: string){
    let key = payment.toLowerCase();
    return this.db.list("/payments/").set(key, {name: payment});
  }

  update(paymentId, payment){
    return this.db.object("/payments/" + paymentId).update(payment);
  }

  delete(paymentId: string){
    return this.db.object("/payments/" + paymentId).remove();
  }
}
