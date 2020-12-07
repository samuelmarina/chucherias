import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app"
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/schemas/producto';
import { OrderService} from '../order/order.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private db: AngularFireDatabase,
    private orderS:OrderService
  ) { }

  save(user: firebase.User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email
    });

    
  };


  getOrderByID(user:firebase.User,orderID:string){
    return this.db.list("/users/" + user.uid + "/orders/"+orderID);
  }
  getAllOrdersUser(user:firebase.User) {
    return this.db.list("/users/" + user.uid+ "/orders");
  }

  getAllOrders(user){

    this.db.list("/users/" + user.uid +'/orders').snapshotChanges().pipe(
      map(changes => changes.map(c => {

        // console.log(c.payload.val());

      }))
    ).subscribe(c => {

      c.map(k => {
        // console.log(k);
      });
    })
    this.orderS.getAll().valueChanges().subscribe(res=>{console.log(res)})
  }

  update_data(user:firebase.User,name:string,apellido:string,imagen:string){
    this.db.object("/users/" + user.uid).update({
      nombre: name,
      apellido: apellido,
      photo:imagen,
      
    });
  }

  async get_user_photo(user:firebase.User){
    let photo;
    // console.log('hola');
    this.db.list("/users/" + user.uid).snapshotChanges().pipe(
      map(changes => changes.map( c => {
        
        if (c.key == 'photo') {
          // console.log('1234');
          let key = c.key;
          photo= c.payload.val();
          console.log(c.payload.val());
          
        }
      }))
    ).subscribe(c => {

      c.map(k => {
      });
    })
    

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
    this.db.list("/users/" + user.uid).snapshotChanges().pipe(
      map(changes => changes.map(c => {
        // console.log(c.key);
        if (c.key == 'nombre' || c.key == 'apellido' || c.key == 'photo' || c.key == 'role') {
          // console.log('1234')
          let key = c.key;
          data[key] = c.payload.val();

          if (c.key == 'nombre' && (data['nombre'] == '' || data['nombre'] == ' ')) {
            console.log(user.displayName);
            // console.log(this.user.displayName.split(' ')[0]);
            if (user.displayName.split(' ').length > 1) {
              data['nombre'] = user.displayName.split(' ')[0];
              data['apellido'] = (user.displayName.split(' ').slice(1, ((user.displayName.length) - 1))).toString();

            } else {
              data['nombre'] = user.displayName;
              data['apellido'] = user.displayName;

            }
      }}})))
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
        });
      })

    // let data={
    //   name:this.db.object("/users/" + user.uid),
    //   lastName: this.db.object("/users/" + user.uid),
    //   photoURL: this.db.object("/users/" + user.uid)
    // }
    // console.log(data);
    
    return data

  }

  async isThereUserName(user:firebase.User){
    
      // console.log(this.db.list("/users/" + user.uid + "email"));
      let all_user_data = [];
      let data = {
        nombre: '',
        apellido: '',
        photo: '',
        role: ''
      };
      let flag:boolean=true;
      this.db.list("/users/" + user.uid).snapshotChanges().pipe(
        map(changes => changes.map(c => {
          // console.log(c.key);
          if (c.key == 'nombre' || c.key == 'apellido' || c.key == 'photo' || c.key == 'role') {
            // console.log('1234')
            let key = c.key;
            data[key] = c.payload.val();

          }
        }))
      )
        .subscribe(async c => {

          c.map(async k => {
            
            // console.log(data.nombre);
            if(await data.nombre=='' || await data.nombre==' '){
              return  flag=false;
            }else{
              return flag=true;
            }
            
          });
        })

      
      // console.log(data);
    return flag

    }
  

}
