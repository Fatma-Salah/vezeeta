import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorURLs } from 'src/app/Environment/App.Const';
import { Idoctor } from 'src/app/Interfaces/idoctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  getAll() {
    return this.http.get(DoctorURLs.Get_Post(), this.options);
  }
  getDoctorById(id: number) {
    return this.http.get(DoctorURLs.GetById_Put_Delete(id), this.options);
  }
  addNewDoctor(doctorDTO: Idoctor) {
    return this.http.post(DoctorURLs.Get_Post(), doctorDTO, this.options);
  }
  updateDoctorInfo(id: number, doctorDTO: Idoctor) {
    return this.http.put(
      DoctorURLs.GetById_Put_Delete(id),
      doctorDTO,
      this.options
    );
  }
  deleteDoctor(id: number) {
    return this.http.delete(DoctorURLs.GetById_Put_Delete(id), this.options);
  }
  getByMail(email: string) {
    return this.http.get(
      `https://localhost:7018/api/Dr/${email}`,
      this.options
    );
  }
}
