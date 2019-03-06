import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServic:AuthService,private router:Router) {

  }

  canActivate():boolean{
    if(!this.authServic.isLoggedIn()){
      this.router.navigate(['login']);
      return false;
    }else{
      return true;
    }
  }

  
}
