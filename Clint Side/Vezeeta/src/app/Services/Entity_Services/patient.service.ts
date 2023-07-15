import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientURLs, SpecializationURLs } from 'src/app/Environment/App.Const';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { IPatientLogin } from 'src/app/Interfaces/ipatient-login';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  
  GetAll(){
    return this.http.get(PatientURLs.Get_Post(),this.options);
  }
  
  GetById(id:number){
    return this.http.get(PatientURLs.GetById_Put_Delete(id),this.options);
  }
  GetByEmail(email:string){
    return this.http.get(PatientURLs.GetByEmail(email),this.options);
  }
  Add(spec:IPatientAdd){
    return this.http.post(PatientURLs.Get_Post(),spec);
  }
  Update(id:number,spec:IPatientAdd){
    return this.http.put(PatientURLs.GetById_Put_Delete(id),spec,this.options);
  }
  Delete(id:number){
    return this.http.delete(PatientURLs.GetById_Put_Delete(id),this.options);
  }
  LoginUser(loginInfo:IPatientLogin){
    
    return this.http.get(PatientURLs.PostByPassword(loginInfo.Password),this.options);
  }
  GetPatientWithQuetions(id:number){
    return this.http.get(PatientURLs.GetWithQuetions(id));
  }
}
