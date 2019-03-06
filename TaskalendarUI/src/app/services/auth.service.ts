import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient,private router:Router,private jwtHelper: JwtHelperService) { }

  private isLogin: boolean;

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }else{
    return !this.jwtHelper.isTokenExpired(token);
    }


  }

  LogIn(user: User) {
    return this.http.post(this.API_URL + 'user/login', user);
  }

  Register(user: User) {
    return this.http.post(this.API_URL + 'user/register', user);
  }

}
