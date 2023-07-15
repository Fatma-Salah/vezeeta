import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient_AppointmentURLs } from 'src/app/Environment/App.Const';
import { IAddAppointToPatient } from 'src/app/Interfaces/iadd-appoint-to-patient';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  getAllAppointForPatient(patient_id:number){
    return this.http.get(Patient_AppointmentURLs.GetById(patient_id),this.options);
  }

  AddPatient_Appoinment(patient_appoint:IAddAppointToPatient,patient_id:number){
    return this.http.post(Patient_AppointmentURLs.Post(patient_appoint,patient_id),patient_appoint);
  }
  DeletePatient_Appoinment(appoint_id:number,patient_id:number){
      return this.http.put(Patient_AppointmentURLs.Delete_Put(appoint_id,patient_id),this.options);
  }
  UpdatePatientAppointState(appoint_id:number,patient_id:number){
      return this.http.put(Patient_AppointmentURLs.Delete_Put(appoint_id,patient_id),this.options);
  }
}

