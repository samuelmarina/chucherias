import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logged = false;
  role;
  available: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private roleService: RoleService
  ) { 
    auth.user$.subscribe(user => {
      if(user){
        this.logged = true;
        this.roleService.getRole(user.uid).valueChanges().subscribe(x => {
          this.role = x;
        })
      }
    })
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    this.logged = false;
  }

  availableburgerItems() {
    this.available = !this.available
  }
}
