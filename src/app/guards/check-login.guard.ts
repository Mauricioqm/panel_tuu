import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor
  (
    private Afauth: AngularFireAuth,
    private router: Router,
    private userServices: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.Afauth.authState.pipe(map( auth => {
        if (isNullOrUndefined(auth)) {
          console.log('no logeado ');
          if (auth === null) {
            this.router.navigateByUrl('/login');
          }
          return true;
        } else {
          console.log('logeado');
          // console.log(auth);
          this.router.navigateByUrl('/home');
          return true;
        }
      }));
    }

}
