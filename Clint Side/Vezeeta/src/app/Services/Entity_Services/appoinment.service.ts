import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentURLs } from 'src/app/Environment/App.Const';
import { IAppoinment } from 'src/app/Interfaces/iappoinment';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAllByDoctor(Dr_id:number){
    return this.http.get(AppointmentURLs.Get(Dr_id),this.options);
  }  
  GetById(id:number,Dr_id:number){
    return this.http.get(AppointmentURLs.GetById_Put_Delete(id,Dr_id),this.options);
  }
  Add(appoinment:IAppoinment){
    return this.http.post(AppointmentURLs.Post(),appoinment,this.options);
  }
  Update(id:number,Dr_id:number,appoinment:IAppoinment){
    return this.http.put(AppointmentURLs.GetById_Put_Delete(id,Dr_id),appoinment,this.options);
  }
  Delete(id:number,Dr_id:number){
    return this.http.delete(AppointmentURLs.GetById_Put_Delete(id,Dr_id),this.options)
  }
  
}
