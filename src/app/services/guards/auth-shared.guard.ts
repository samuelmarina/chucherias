import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { RoleService } from '../role/role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedGuard implements CanActivate {
  
  user;
  logged;
  role;
  constructor(private authS: AuthService,
    private router: Router,
    private afsAuth: AngularFireAuth,
    private roleService: RoleService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.afsAuth.authState
      .pipe(take(1)).pipe(map(authState => !!authState)).pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['']);

        }})); 

  }
  
}
