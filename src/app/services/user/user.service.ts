import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app"
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private db: AngularFireDatabase
  ) { }

  save(user: firebase.User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  };

  update_data(user:firebase.User,name:string,apellido:string,imagen:string){
    this.db.object("/users/" + user.uid).update({
      nombre: name,
      apellido: apellido,
      photo:imagen,
      
    });
  }

  async get_data(user:firebase.User){
    // console.log(this.db.list("/users/" + user.uid + "email"));
    let all_user_data=[];
    let data={
      nombre:'',
      apellido:'',
      photo:'',
      role:''
    };
    await this.db.list("/users/" + user.uid).snapshotChanges().pipe(
      map(changes => changes.map(c => {
        // console.log(c.key);
        if (c.key == 'nombre' || c.key == 'apellido' || c.key == 'photo' || c.key=='role') {
          // console.log('1234')
          let key = c.key;
          data[key] = c.payload.val();

        }
         }))
    )
      .subscribe(c => {
        
        c.map(k => {
          
          // console.log(c.key);
          // if (c.key == 'nombre' || c.key == 'apellido' || c.key == 'imagen') {
          //   console.log('1234')
          //   let key = c.key;
          //   data[key] = c.payload.val();

          // }



          // this.all_products.push({
          //   key: k.key,
          //   ...k.payload.val() as any
          // } as Producto)
          
          // all_user_data.push({
          //   key: k.key,
          //   ...k.payload.val() as any
          // } )

          // console.log(all_user_data)
          
           
          // if(k.key=='name'){ console.log(k.payload.val()) }
          
        })})

    // let data={
    //   name:this.db.object("/users/" + user.uid),
    //   lastName: this.db.object("/users/" + user.uid),
    //   photoURL: this.db.object("/users/" + user.uid)
    // }
    console.log(data);
    return data

  }

}
