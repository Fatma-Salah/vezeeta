import { TokenService } from './../../Services/Token/token.service';
import { AuthService } from './../../Services/Token/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/Interfaces/ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
constructor(private authService:AuthService,private tokenService:TokenService, private router:Router){}
showError=false;
formLogin:any; 
ngOnInit(): void {
  this.formLogin = new FormGroup({
    patientEmail :new FormControl("",[Validators.required ,Validators.minLength(11)]),
    patientPassword :new FormControl('',[Validators.required]),
  });
}

get getEmail(){
  return this.formLogin.controls["patientEmail"]
}

get getPass(){
  return this.formLogin.controls["patientPassword"]
}
Login(e:any){
 
  e.preventDefault();
  // console.log(this.formLogin);
  
  if(this.formLogin.status=='VALID'){
    let user:ILogin = {email:this.getEmail?.value,password:this.getPass?.value}
    this.authService.loginPatient(user).subscribe({
      next:(response:any) => {
          let res = response.body.response;
          this.tokenService.SaveToken(res.patient.id,res.token,res.role,res.patient.name);
          this.router.navigate(['home']);
      },
      error: (e) => {console.error(e),this.showError=true},
      complete: () => console.info('Success')
    })
  }else{
    this.showError=true;
  }
}
}
