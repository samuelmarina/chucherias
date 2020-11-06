import { Component, OnInit, Input } from '@angular/core';

import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  @Input() logged:boolean= AppComponent.logged;
  @Input()  user:string= AppComponent.user;

  available: boolean = false;

  availableburgerItems() {
    
    if (this.available === false) {
      this.available = true;
      console.log('true');
    } else {
      this.available = false;
      console.log('false');
    }

  }

  constructor() { }

  ngOnInit(): void {
  }

}
