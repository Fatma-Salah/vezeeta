import { TokenService } from './../../../Services/Token/token.service';
import { PatientService } from './../../../Services/Entity_Services/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-questions',
  templateUrl: './patient-questions.component.html',
  styleUrls: ['./patient-questions.component.css']
})
export class PatientQuestionsComponent implements OnInit {
  patientId?:any;
  patient?:any;
  constructor(private patientService:PatientService,private tokenService:TokenService){
    this.patientId = tokenService.GetUserId();
  }
  ngOnInit(): void {

    this.patientService.GetPatientWithQuetions(this.patientId).subscribe({
      next:(response:any) => {
        this.patient = response;

        
       },
       error: (e) => console.error(e),
       complete: () => console.info('Success')
    })
  }
}
