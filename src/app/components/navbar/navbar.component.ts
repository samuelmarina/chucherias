import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
    this.available = !this.available
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }



}
