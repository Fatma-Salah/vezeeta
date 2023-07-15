import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import { IsActiveMatchOptions } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';


@Component({
  selector: 'app-patient-account',
  templateUrl: './patient-account.component.html',
  styleUrls: ['./patient-account.component.css']
})
export class PatientAccountComponent implements OnInit  { 

  constructor(private patientService:PatientService) {}
 forgetPassActivate =false;
profileActiviate=true;
passDiv:any;
profileDiv:any;
// forget pass component 

showSpinner = false;
alertDiv=false;
oldPassfromServer:any;
newPassword:any;
showError = false;
formChangePass:any;
patient:IPatientAdd  |undefined;
temp:any;
ErrorFromServer=false;
patientId:number =0; // get from localStorage  after login

/// profile
formProfile:any;
initialFormValues:any;

  async ngOnInit() { 
  if(localStorage.getItem("UserId"))
        this.patientId=Number(localStorage.getItem("UserId"));
         /////// profile
     this.formProfile =   new FormGroup({
      patientName: new FormControl( '', [Validators.required, Validators.minLength(3)]),
      patientEmail :new FormControl( '',[Validators.required ,Validators.email]),
      patientPhone :new FormControl( '',[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$|^2[0-5][0-9]{6}$/)]),
      patientBirth_date :new FormControl( '',Validators.required), 
      patientAddress :new FormControl( Validators.required),
      patientPassword :new FormControl(),
       patientGender :new FormControl(),
      });

      // change pass
      this.formChangePass =   new FormGroup({
        patientPassword :new FormControl('',Validators.required ),
        patientNewPassword :new FormControl('',[Validators.required ,  Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z\u0621-\u064A])(?=.*[@#$%]).{8,}$/)]),
        patientName: new FormControl(),
        patientEmail :new FormControl(),
        patientPhone :new FormControl(),
         patientAddress :new FormControl(),
          patientGender :new FormControl(),
      });

    this.patientService.GetById(this.patientId).subscribe({
      next: async (a) => {
        this.temp = a.body;
        this.patient = await this.temp;

        if (this.patient != undefined) {
          this.oldPassfromServer = this.patient.password;
          this.initialFormValues = {
            patientName: this.patient.name,
            patientEmail: this.patient.email,
            patientPhone: this.patient.phone,
            patientBirth_date: this.patient.birth_date,
            patientAddress: this.patient.address,
            patientPassword: this.patient.password,
            patientGender: this.patient.gender,
          };

          this.formProfile.setValue(this.initialFormValues);
          // set value to user who change pass
          this.formChangePass.controls["patientName"].setValue(this.patient.name);  
          this.formChangePass.controls["patientEmail"].setValue(this.patient.email);  
          this.formChangePass.controls["patientPhone"].setValue(this.patient.phone);  
          this.formChangePass.controls["patientAddress"].setValue(this.patient.address);
          this.formChangePass.controls["patientGender"].setValue(this.patient.gender);
         

        }
      }
    });
  }

  get getPass(){
return this.formChangePass.controls["patientPassword"]
}
get getNewPass(){
    return this.formChangePass.controls["patientNewPassword"]
  }

  updatePass(e:any){
      e.preventDefault();   
      
    if( this.formChangePass.status === 'VALID'){  
      this.showSpinner = true;
  const oldPasswordFromUser = this.getPass.value;
    const newPassword = this.getNewPass.value; 
    console.log(oldPasswordFromUser);
    console.log(this.oldPassfromServer);
    
  if(this.oldPassfromServer == oldPasswordFromUser){  
  this.ErrorFromServer=false;
    this.getPass.setValue(newPassword);
// this.formChangePass.setValue(this.formProfile);
    this.patientService.Update(this.patientId,this.formChangePass.value).subscribe({
      error:(w)=>console.log(w.error),
      next:()=>{ 
      
            setTimeout(() => {
              this.showSpinner = false;
            }, 2000);
        
            setTimeout(() => {
              this.alertDiv=true;
            }, 2100);
            
          
      }
    });
  } else{
   this.ErrorFromServer =true;
    this.showSpinner = false;
    
  }  
    }else{
      this.showError = true;
      this.showSpinner = false;
    }
  }
forgetPass(){
  this.forgetPassActivate=true;
  this.passDiv = document.getElementById('Forgetpass');
  this.passDiv.classList.add('linkActive');
  this.profileDiv.classList.remove('linkActive');
this.profileActiviate=false;
console.log(this.formChangePass);

}
///////////////////////////////patientProfile

get getName(){
  return this.formProfile.controls["patientName"];
}

get getPhone(){
  return this.formProfile.controls["patientPhone"]
}
get getEmail(){
  return this.formProfile.controls["patientEmail"]
}
get getBirth(){
  return this.formProfile.controls["patientBirth_date"]
}
get getAddress(){
  return this.formProfile.controls["patientAddress"]
}




updateInfo(e:any){
  e.preventDefault();  
  console.log(this.formProfile.status);
  console.log(this.formProfile);
  
  if( this.formProfile.status === 'VALID' ){  
    this.showSpinner = true;
    this.patientService.Update(this.patientId, this.formProfile.value).subscribe({
  
          error: (e) => console.log(e.error),
          complete: () => {
            setTimeout(() => {
              this.showSpinner = false;
            }, 2000);

            setTimeout(() => {
              this.alertDiv=true;
            }, 2100);
          }
        });
  }
}

resetForm() :void{
  this.formProfile.setValue(this.formProfile.value);
}

getProfile(){
  this.forgetPassActivate=false;
  this.profileDiv = document.getElementById('profile');
this.profileDiv.classList.add('linkActive');
this.passDiv.classList.remove('linkActive');
this.profileActiviate=true;

}
}


