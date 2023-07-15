import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from 'src/app/Interfaces/ilogin';
import { AuthURLs } from 'src/app/Environment/App.Const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService:TokenService, private http:HttpClient,private router:Router) { }

  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  loginAdmin(adminlogin:ILogin){
    return this.http.post(AuthURLs.Admin_Login(),adminlogin,this.options);
  }
  loginDoctor(doctorlogin:ILogin){
    return this.http.post(AuthURLs.Doctor_Login(),doctorlogin,this.options);
  }
  loginPatient(patientlogin:ILogin){
    return this.http.post(AuthURLs.Patient_Login(),patientlogin,this.options);
  }
  logout(){
    this.tokenService.ClearToken();
    this.router.navigate(['/login']);
    return
  }
  get isLoggedIn(){
    if (this.tokenService.GetToken()) {
      return true;
    } else {
      return false;
    }
  }
  get isAdmin(){
    if (this.tokenService.GetRole() == "Admin") {
      return true;
    } else {
      return false;
    }
  }
  get isDoctor(){
    if (this.tokenService.GetRole() == "Doctor") {
      return true;
    } else {
      return false;
    }
  }
  get isPatient(){
    if (this.tokenService.GetRole() == "Patient") {
      return true;
    } else {
      return false;
    }
  }
  
}
