import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  showError=false;
constructor( private patientService:PatientService , private router:Router) {}
  Patient : IPatientAdd [] =[] ;
  formRegister:any;
  errorFromServer:string='';
ngOnInit(): void {
  this.formRegister = new FormGroup({
    patientName:new FormControl("",[Validators.required,Validators.minLength(3)]),
    patientEmail :new FormControl("",[Validators.required ,Validators.email]),
    patientPhone :new FormControl("",[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$|^2[0-5][0-9]{6}$/)]),
     patientBirth_date :new FormControl("",Validators.required), 
     patientGender: new FormControl('', [Validators.required ]),
     patientAddress :new FormControl('',Validators.required),
    //  patientPassword :new FormControl('',[Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$/)]),
     patientPassword :new FormControl('',[Validators.required ,  Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z\u0621-\u064A])(?=.*[@#$%]).{8,}$/)]),
  }) ;
  
}

 
get getName(){
  return this.formRegister.controls["patientName"]
}

get getPhone(){
  return this.formRegister.controls["patientPhone"]
}
get getEmail(){
  return this.formRegister.controls["patientEmail"]
}
get getBirth(){
  return this.formRegister.controls["patientBirth_date"]
}
get getGender(){
  return this.formRegister.controls["patientGender"]
}
get getAddress(){
  return this.formRegister.controls["patientAddress"]
}
get getPass(){
  return this.formRegister.controls["patientPassword"]
}

addPatient(e:any){
e.preventDefault();
console.log(this.formRegister.status);
  
if (this.formRegister.status === 'VALID') { 
 this.patientService.Add(this.formRegister.value).subscribe(
  {
  error:(e)=>{
    console.log(e);
    
  this.errorFromServer=e.error;
  },
  complete:()=>{console.log("s");
  this.router.navigate(['/login']);
  }
 } );
}else{
  this.showError = true;
}

}
}