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
  user;
  shoppingBags: any[] = [];
  overallQuantity: number;
  booleano: boolean;

  constructor(
    private bagService: ShoppingBagService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.auth.user$.subscribe(user => {
      if(user){
        this.user = user;
         let ref = firebase.database().ref("/users/" + user.uid + "/shopping-bags/");
          ref.once("value").then(res => {
            this.booleano = res.exists();
          })
    
        this.bagService.getBag(this.user).valueChanges().subscribe(x => {
          this.overallQuantity = x.quantity;
          for(let price in x.items){
            let allBags = {
              price: price,
              bags: [],
              total: 0,
              totalQty: 0
            }
            for(let bag in x.items[price].bags){
              let tempBag = {
                products: [],
                quantity: x.items[price].bags[bag].quantity
              }
              for(let product in x.items[price].bags[bag].products){
                tempBag.products.push(x.items[price].bags[bag].products[product]);
                allBags.totalQty += tempBag.quantity
              }
              allBags.total += this.parseString(allBags.price) * (tempBag.quantity/50);
              allBags.bags.push(tempBag);              
            }
            console.log(allBags);
            this.shoppingBags.push(allBags);
          }
        });
      }
    })
    })
  }

  private getTotal(allBags, tempBag){
    let price = this.parseString(allBags['price']);
    let amount = (tempBag['quantity'])/50;
    return price * amount;
  }

  parseString(word: string){
    word.replace(",", ".");
    return Number(word.replace(",", "."));
  }
} 

