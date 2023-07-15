import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import * as emailjs from 'emailjs-com';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {

  constructor(private patientService:PatientService , private router:Router,private doctorService:DoctorService) {}
  showError=false;
  erorrFromServer :string='';
formForgetPass:any;
temp:any;
data:IPatientAdd|undefined;
code:any;
role=localStorage.getItem('Role');


ngOnInit(): void {
 this.formForgetPass = new FormGroup({
  patientEmail :new FormControl('',[Validators.required ,Validators.email]),
  patientAddress:new FormControl(),
  patientGender:new FormControl(),
  patientName:new FormControl(),
  patientPassword:new FormControl(),
  patientPhone: new FormControl(),
  patientCode: new FormControl(),
   });
}


get getEmail(){
  return this.formForgetPass.controls['patientEmail']
}
get getCode(){
  return this.formForgetPass.controls['patientCode']
}
forgetPass(e:any){
  e.preventDefault();
  console.log(this.role);
  
  if(this.formForgetPass.status=='VALID'){
    console.log('valid');
    
    const id = Number(localStorage.getItem('UserId'));
     // search by mail in patient
            if(this.role == 'Patient'){
              this.patientService.GetByEmail(this.getEmail.value).subscribe({
                next:(p)=>{
                  this.temp=p.body;
                  this.data=this.temp;
                  
                 if(this.data != undefined){
                  this.formForgetPass.controls['patientEmail'].setValue(this.data.email);
                  this.formForgetPass.controls['patientAddress'].setValue(this.data.address);
                  this.formForgetPass.controls['patientGender'].setValue(this.data.gender);
                  this.formForgetPass.controls['patientPassword'].setValue(this.data.password);
                  this.formForgetPass.controls['patientPhone'].setValue(this.data.phone);
                  this.formForgetPass.controls['patientName'].setValue(this.data.name); 
                 }

                  // send Code to this Email 
                          if(this.data != undefined){
                            console.log(this.data.id);
                            this.GenerateCodeAndSendEmail(this.data.email , this.data.id);
                          }
                     setTimeout(() => {
                      
                this.router.navigate(['/confirmCode']);
                     }, 2000);
                },
                  error:(e)=>{
                    console.log(e.error);
                    this.erorrFromServer=e.error;
                    console.log(this.getEmail);
                    
                  }
               });
                if(this.data){
                  this.data.code = this.code;
                  
                  this.patientService.Update(id,this.formForgetPass).subscribe((e)=>console.log(e))
                }
               
            }
    // search by mail in Dr
            else  if(this.role == 'Doctor'){
                console.log(this.getEmail.value);
                
                this.doctorService.getByMail(this.getEmail.value).subscribe({
                  next:(dr)=>{console.log(dr.body);
                  
                    this.temp=dr.body;
                    this.data=this.temp;
                    // send Code to this Email 
                            if(this.data != undefined){
                              console.log(this.data.id);
                              this.GenerateCodeAndSendEmail(this.data.email , this.data.id);
                            
                       setTimeout(() => {
                  this.router.navigate(['/confirmCode']);
                       }, 2000);
                      }else{   this.erorrFromServer='mail not found';}
                  },
                    error:(e)=>{
                      console.log(e.error);
                      this.erorrFromServer=e.error;
                      console.log(this.getEmail);
                      
                    }
                });
                if(this.data){
                  this.data.code = this.code;
                  
                  this.patientService.Update(id,this.data).subscribe((e)=>console.log(e))
                }
              }

  }else{
    this.showError=true;
  }
}


GenerateCodeAndSendEmail(email:any,user_id:number) {
  
// Generate a random code
  this.code = Math.floor(Math.random() * 1000000);
 // save code in DB 
 this.getCode.setValue(this.code);
 console.log(this.code);
 if(this.data != undefined)
 this.patientService.Update(user_id,this.formForgetPass.value).subscribe({
  next:(e)=>console.log(e.body),
  error:(e)=>console.log(e.error)
 });
 console.log(this.formForgetPass);
 
 // send Email
  emailjs.init('txV5RAwzRQ6JTKJqh');
  const templateParams = {
    email_to: email,
    to_name: 'Recipient Name',
    fullname: 'Your Name',
    code :this.code,
   };

  emailjs.send('service_ztuz25h', 'template_c434x9p', templateParams, 'txV5RAwzRQ6JTKJqh')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
}
 
}
