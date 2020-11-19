import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showActions: boolean;

  constructor(
    private auth: AuthService,
  ) { 
    auth.user$.subscribe(user => {
      this.showActions = user ? true : false;
    })
  }

  ngOnInit(): void {
  }


  



}
