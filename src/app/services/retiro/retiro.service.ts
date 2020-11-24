import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll(){
    return this.db.list("/retiros");
  }

  getRetiro(retiroId: string){
    return this.db.object("/retiros/" + retiroId);
  }

  create(retiro: string){
    let key = retiro.toLowerCase();
    return this.db.list("/retiros/").set(key, {name: retiro});
  }

  update(retiroId, retiro){
    return this.db.object("/retiros/" + retiroId).update(retiro);
  }

  delete(retiroId: string){
    return this.db.object("/retiros/" + retiroId).remove();
  }
}
