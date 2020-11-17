import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chucherias';

  logged: boolean = false;
  user: string='usuario';

  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
    ) {
      auth.user$.subscribe(user => {
      if(user){
        userService.save(user);
        let returnUrl = localStorage.getItem("returnUrl");
        router.navigateByUrl(returnUrl);
      }
    })
    }

    ngOnInit(){
      this.subscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(()=>window.scrollTo(0,0));
    }
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

}


