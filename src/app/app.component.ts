import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chucherias';

  logged: boolean = false;
  user: string='usuario';

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
    ) {
      auth.user$.subscribe(user => {
      if(user){
        userService.save(user);
        // let returnUrl = localStorage.getItem("returnUrl");
        // router.navigateByUrl(returnUrl);
      }
    })
    }

}


