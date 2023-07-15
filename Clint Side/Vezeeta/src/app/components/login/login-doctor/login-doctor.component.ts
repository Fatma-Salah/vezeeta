import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/Interfaces/ilogin';
import { AuthService } from 'src/app/Services/Token/auth.service';
import { TokenService } from 'src/app/Services/Token/token.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.css']
})
export class LoginDoctorComponent {
  constructor(private authService:AuthService,private tokenService:TokenService, private router:Router){}
  showError=false;
  formLogin:any; 
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      patientEmail :new FormControl("",[Validators.required ,Validators.email]),
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
      this.authService.loginDoctor(user).subscribe({
        next:(response:any) => {
            let res = response.body.response;
            this.tokenService.SaveToken(res.doctor.id,res.token,res.role,res.doctor.name);
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
