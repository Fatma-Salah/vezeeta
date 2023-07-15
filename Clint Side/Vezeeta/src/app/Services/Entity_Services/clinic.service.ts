import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClinicURLs } from 'src/app/Environment/App.Const';
import { Iclinic } from 'src/app/Interfaces/iclinic';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private http: HttpClient) {}
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  getAll() {
    return this.http.get(ClinicURLs.Get_Post(), this.options);
  }
  getClinicById(id: number) {
    return this.http.get(ClinicURLs.GetById_Put_Delete(id), this.options);
  }
  addNewClinic(clinic: any) {
    return this.http.post(ClinicURLs.Get_Post(), clinic, this.options);
  }
  updateClinic(id: number, clinic: any) {
    return this.http.put(
      ClinicURLs.GetById_Put_Delete(id),
      clinic,
      this.options
    );
  }
  RemoveClinic(id: number) {
    return this.http.delete(ClinicURLs.GetById_Put_Delete(id), this.options);
  }
}
