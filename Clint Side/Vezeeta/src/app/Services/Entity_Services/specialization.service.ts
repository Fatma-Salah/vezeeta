import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecializationURLs } from 'src/app/Environment/App.Const';
import { ISpecialization } from 'src/app/Interfaces/ispecialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAll(){
    return this.http.get(SpecializationURLs.Get_Post(),this.options);
  }
  GetById(id:number){
    return this.http.get(SpecializationURLs.GetById_Put_Delete(id),this.options);
  }
  Add(spec:ISpecialization){
    return this.http.post(SpecializationURLs.Get_Post(),spec,this.options);
  }
  Update(id:number,spec:ISpecialization){
    return this.http.put(SpecializationURLs.GetById_Put_Delete(id),spec,this.options);
  }
  Delete(id:number){
    return this.http.delete(SpecializationURLs.GetById_Put_Delete(id),this.options);
  }

}
