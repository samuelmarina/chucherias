import { Component, OnInit } from '@angular/core';

import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  user: User;
  booleano: boolean;

  constructor(private auth: AuthService) { }

  async ngOnInit(){
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/cart/");
      ref.once("value").then(res => {
        this.booleano = res.exists();
        console.log(this.booleano);
        
      })
  })
  }

}
