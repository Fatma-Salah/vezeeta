import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressURLs } from 'src/app/Environment/App.Const';
import { IAddress } from 'src/app/Interfaces/i-address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  GetAll() {
    return this.http.get(AddressURLs.Get_Post(), this.options);
  }
  GetById(id: number) {
    return this.http.get(AddressURLs.GetById_Put_Delete(id), this.options);
  }
  Add(spec: IAddress) {
    return this.http.post(AddressURLs.Get_Post(), spec);
  }
  Update(id: number, spec: IAddress) {
    return this.http.put(AddressURLs.GetById_Put_Delete(id), spec, this.options);
  }
  Delete(id: number) {
    return this.http.delete(AddressURLs.GetById_Put_Delete(id), this.options);
  }

}
