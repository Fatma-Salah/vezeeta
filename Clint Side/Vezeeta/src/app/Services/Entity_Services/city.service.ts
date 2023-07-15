import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityURLs } from 'src/app/Environment/App.Const';
import { ICity } from './../../Interfaces/i-city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  GetAll() {
    return this.http.get(CityURLs.Get_Post(), this.options);
  }
  GetById(id: number) {
    return this.http.get(CityURLs.GetById_Put_Delete(id), this.options);
  }
  Add(spec: ICity) {
    return this.http.post(CityURLs.Get_Post(), spec);
  }
  Update(id: number, spec: ICity) {
    return this.http.put(CityURLs.GetById_Put_Delete(id), spec, this.options);
  }
  Delete(id: number) {
    return this.http.delete(CityURLs.GetById_Put_Delete(id), this.options);
  }

}
