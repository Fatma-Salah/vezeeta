import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Idoctor } from 'src/app/Interfaces/idoctor';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  constructor(private patientService:PatientService, private doctorService:DoctorService , private router:Router) {}
  formRestPass:any;
  showError=false;
  ErrorFromServer = false;
  isDone=false;
  isConfirm=true;
  patientData :IPatientAdd|undefined;
  DocData:Idoctor | undefined;
  temp:any;
  id:any;
  role:any;

  ngOnInit(): void {
    this.formRestPass = new FormGroup({
      patientPassword :new FormControl('',[Validators.required ,  Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z\u0621-\u064A])(?=.*[@#$%]).{8,}$/)]),
      confirmPassword : new FormControl('',Validators.required),
      patientEmail :new FormControl(),
      patientAddress:new FormControl(),
      patientGender:new FormControl(),
      patientName:new FormControl(),
      patientPhone: new FormControl(),
      patientCode: new FormControl(),
    });
    if(localStorage.getItem('UserId') && localStorage.getItem('Role'))
    {
        this.id=localStorage.getItem('UserId');
        this.role=localStorage.getItem('Role');
        ////////////////////get info for patient
        if(this.role=='Patient'){
              this.patientService.GetById(this.id).subscribe({
                next:(p)=>{
                    this.temp=p.body;
                    this.patientData=this.temp;
                    if(this.patientData != undefined){
                                this.formRestPass.controls['patientEmail'].setValue(this.patientData.email);
                                this.formRestPass.controls['patientAddress'].setValue(this.patientData.address);
                                this.formRestPass.controls['patientGender'].setValue(this.patientData.gender);
                                this.formRestPass.controls['patientName'].setValue(this.patientData.name);
                                this.formRestPass.controls['patientPhone'].setValue(this.patientData.phone);
                                this.formRestPass.controls['patientCode'].setValue(this.patientData.code);

                    }
                },
                error:(e)=>{ console.log(e);  }
              });
        }
        ////////////////////get info for Dr
      else  if(this.role=='Doctor'){
          this.doctorService.getDoctorById(this.id).subscribe({
            next:(doc)=>{
              this.temp=doc.body;
              this.doctorService=this.temp;
            }
          });
        }
    }
  }
  get getNewPass(){
    return this.formRestPass.controls['patientPassword'];
  }
 get getConfirmPass(){
  return this.formRestPass.controls['confirmPassword'];
 }
  resetPass(e:any){
    e.preventDefault();
  
    
    if(this.formRestPass.status === 'VALID' ){
      if(this.getNewPass.value === this.getConfirmPass.value){
        this.isConfirm=true;
        // update user datta with new pass  ??
       
        if(this.role=='Patient'){
            this.patientService.Update(this.id,this.formRestPass.value).subscribe({
              next:(p)=>{
                if(p.body){
                  this.isDone=true;
                setTimeout(() => {
                          this.router.navigate(['/login']);
                }, 3000);}
              },
              error:(e)=>{console.log(e.error);this.ErrorFromServer=true; },

            })
        }
       else if(this.role=='Doctor'){

        if(this.DocData )
              { 
                this.DocData.password = this.getNewPass.value;
                this.doctorService.updateDoctorInfo(this.id,this.DocData).subscribe({
                next:(doc)=>{
                  if(doc.body){
                    this.isDone=true;
                  setTimeout(() => {
                            this.router.navigate(['/login']);
                  }, 3000);}
                },
                error:(e)=>{console.log(e);this.ErrorFromServer=true; },
  
              });
            }
        }
        // go to login after update daa
        
  // this.router.navigate(['/login']);
}
    }else{
      this.showError=true;
      if(this.getNewPass.value !== this.getConfirmPass.value){
                  this.isConfirm=false;
      }
    }
  }
}
