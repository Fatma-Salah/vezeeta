import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReigonURLs } from 'src/app/Environment/App.Const';
import { Ireigon } from './../../Interfaces/ireigon';

@Injectable({
  providedIn: 'root'
})
export class ReigonService {
  constructor(private http: HttpClient) { }

  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  GetAll() {
    return this.http.get(ReigonURLs.Get_Post(), this.options);
  }
  GetById(id: number) {
    return this.http.get(ReigonURLs.GetById_Put_Delete(id), this.options);
  }
  Add(spec: Ireigon) {
    return this.http.post(ReigonURLs.Get_Post(), spec);
  }
  Update(id: number, spec: Ireigon) {
    return this.http.put(ReigonURLs.GetById_Put_Delete(id), spec, this.options);
  }
  Delete(id: number) {
    return this.http.delete(ReigonURLs.GetById_Put_Delete(id), this.options);
  }

}
