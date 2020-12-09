import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showActions: boolean;
  role:any;

  constructor(
    private auth: AuthService,
    private roleService: RoleService
  ) { 
    auth.user$.subscribe(user => {
      this.showActions = user ? true : false;
      this.roleService.getRole(user.uid).valueChanges().subscribe(role => {
        if(!role){
          this.roleService.createRole(user.uid);
          return this.role = "user";
        }
        this.role = role;
        if(this.role == "admin"){
          this.showActions = false
        }else{
          this.showActions = true
        }
      })

    })
  }

  ngOnInit(): void {
  }


  



}
