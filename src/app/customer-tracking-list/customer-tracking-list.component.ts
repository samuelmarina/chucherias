import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-customer-tracking-list',
  templateUrl: './customer-tracking-list.component.html',
  styleUrls: ['./customer-tracking-list.component.css']
})
export class CustomerTrackingListComponent implements OnInit {
  orderID;
  user;
  orders=[];
  order;
  constructor(
              private auth: AuthService,
              private UserS:UserService
  ) {
    this.orderID = window.location.href.split('/')[window.location.href.split('/').length-1];
    console.log(this.orderID);
    
    this.auth.user$.subscribe(async user => {
      this.user = user;
      // console.log(this.UserS.getOrderByID(user,this.orderID));
      this.UserS.getOrderByID(user, this.orderID).snapshotChanges().subscribe(c=>{
        c.forEach(res=>{
          console.log(res.payload.val())
        })
      })
    
    })
   }

  ngOnInit(): void {
  }

}
