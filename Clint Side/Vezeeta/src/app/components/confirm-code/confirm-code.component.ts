import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Idoctor } from 'src/app/Interfaces/idoctor';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit {

  constructor(private patientService:PatientService ,private DocService:DoctorService, private router:Router) {}
  showError=false;
  erorrFromServer :string='';
formConfirmCode:any;
temp:any;
patientData:IPatientAdd|undefined;
DocData:Idoctor|undefined;
user:any;
codeFromServer:any;
isCodeConfirm=false;
role=localStorage.getItem("Role");

ngOnInit(): void {
 this.formConfirmCode = new FormGroup({
   Code:new FormControl("",Validators.required),
   });
}
get getCode(){
  return this.formConfirmCode.controls['Code']
}

submitCode(e:any){
  e.preventDefault();console.log(this.getCode);
  
  console.log(this.formConfirmCode.status);
  
  if(this.formConfirmCode.status=='VALID'){
    console.log('valid');
      if(localStorage.getItem("UserId")){
        this.user=localStorage.getItem("UserId");
        if(this.role == 'Doctor'){
          this.DocService.getDoctorById(this.user).subscribe({
              next:(doc)=>{
                this.temp=doc.body;
                this.DocData=this.temp;
                if(this.DocData != undefined){
                  console.log(this.DocData.code);
                  this.codeFromServer = this.DocData.code;
                  if(this.codeFromServer == this.getCode.value){
                       // after confirm Code 
                       this.isCodeConfirm=true;
                              setTimeout(() => {
                                             this.router.navigate(['/resetPassword']);
                                           }, 3000);
                                           this.erorrFromServer='';
                  }else{this.erorrFromServer='code not match '}
                }
              },
              error:()=>{ this.showError=true;}
          });
      }
      if(this.role == 'Patient'){
        this.patientService.GetById(this.user).subscribe({
            next:(patient)=>{
              this.temp=patient.body;
              this.patientData=this.temp;
              if(this.patientData != undefined){
                console.log(this.patientData);
                this.codeFromServer = this.patientData.code;
                if(this.codeFromServer == this.getCode.value){
                     // after confirm Code 
                     this.isCodeConfirm=true;
                            setTimeout(() => {
                                           this.router.navigate(['/resetPassword']);
                                         }, 3000);
                                         this.erorrFromServer='';
                }else{this.erorrFromServer='code not match '}
              }
            },
            error:()=>{ this.showError=true;}
        });
    }
      }
    }else{
      this.showError=true;
    }
  }
}



 


