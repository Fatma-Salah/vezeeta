import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/Token/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGaurd implements CanActivate{
  constructor(private auth:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.isLoggedIn) {
      if (this.auth.isDoctor) {
        return true;
      } else {
        this.router.navigate(['home']);
        return false;
      }
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
  
};