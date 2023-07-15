import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrescriptionURLs } from 'src/app/Environment/App.Const';
import { IPrescription } from 'src/app/Interfaces/iprescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAllByDoctor(Dr_id:number){
    return this.http.get(PrescriptionURLs.GetByDoctor(Dr_id),this.options);
  }
  GetAllByPatient(patient_id:number){
    return this.http.get(PrescriptionURLs.GetByPatient(patient_id),this.options);
  }
  GetById(Dr_id:number,patient_id:number){
    return this.http.get(PrescriptionURLs.GetById_Put_Delete(Dr_id,patient_id),this.options);
  }
  Add(prescription:IPrescription){
    return this.http.post(PrescriptionURLs.Post(),prescription,this.options);
  }
  Update(Dr_id:number,patient_id:number,prescription:IPrescription){
    return this.http.put(PrescriptionURLs.GetById_Put_Delete(Dr_id,patient_id),prescription,this.options);
  }
  Delete(Dr_id:number,patient_id:number){
    return this.http.delete(PrescriptionURLs.GetById_Put_Delete(Dr_id,patient_id),this.options)
  }
}
