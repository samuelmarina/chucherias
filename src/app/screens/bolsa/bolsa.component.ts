import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';
import { UserService } from 'src/app/services/user/user.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})
export class BolsaComponent implements OnInit {
  user: User;
  booleano: boolean;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
      ref.once("value").then(res => {
        this.booleano = res.exists();
        console.log(this.booleano);
        
      })
  })
}
} 

