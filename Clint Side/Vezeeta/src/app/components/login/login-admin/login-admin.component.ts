import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/Interfaces/ilogin';
import { AuthService } from 'src/app/Services/Token/auth.service';
import { TokenService } from 'src/app/Services/Token/token.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  constructor(private authService:AuthService,private tokenService:TokenService, private router:Router){}
  showError=false;
  formLogin:any; 
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      patientEmail :new FormControl("",[Validators.required]),
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
    console.log(this.formLogin);
    
    if(this.formLogin.status=='VALID'){
      let user:ILogin = {email:this.getEmail?.value,password:this.getPass?.value}
      this.authService.loginAdmin(user).subscribe({
        next:(response:any) => {
            let res = response.body.response;
            this.tokenService.SaveToken(0,res.token,res.role,res.admin.email);
            this.router.navigate(['home']);// change to admin screen
        },
        error: (e) => {console.error(e),this.showError=true},
        complete: () => console.info('Success')
      })
    }else{
      this.showError=true;
    }
  }
}
