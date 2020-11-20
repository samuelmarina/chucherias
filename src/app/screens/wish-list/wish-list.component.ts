import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private auth: AuthService) { }
  user: User;
  booleano: boolean;

  async ngOnInit(){
    this.auth.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/wishlist/");
      ref.once("value").then(res => {
        this.booleano = res.exists();
        console.log(this.booleano);
        
      })
  })
  }

}
