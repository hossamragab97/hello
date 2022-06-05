import {
    CanActivate,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, take } from 'rxjs/operators';
  import { AuthService } from './auth.service';
  
  
    @Injectable({ providedIn: 'root' })
    export class Authentication implements CanActivate {
      constructor(
        private router: Router,
        private auth:AuthService
        ) {}
  
  
      canActivate():
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.auth.itemValue.pipe(
          take(1),
          map(user => {
            const isAuth = !!user;
            if (isAuth) {
              console.log(this.router.url);
              console.log( window.location.href);
              return true;
            }
            return this.router.createUrlTree(['/auth']);
          })
        );
      }
    }
  
  
  