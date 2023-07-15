import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorPhoneURLs } from 'src/app/Environment/App.Const';
import { IdoctorPhone } from 'src/app/Interfaces/idoctor-phone';

@Injectable({
  providedIn: 'root',
})
export class DoctorPhonesService {
  constructor(private http: HttpClient) {}
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  getAll() {
    return this.http.get(DoctorPhoneURLs.Get_Post(), this.options);
  }

  getByDoctorId(id: number) {
    return this.http.get(DoctorPhoneURLs.GetById(id), this.options);
  }

  getDoctorByPhone(phone: string) {
    return this.http.get(
      `https://localhost:7018/api/Dr_phone/${phone}`,
      this.options
    );
  }

  addNewPhone(drPhone: any) {
    return this.http.post(DoctorPhoneURLs.Get_Post(), drPhone, this.options);
  }
  deletePhone(id: number, phone: any) {
    return this.http.delete(
      `https://localhost:7018/api/Doctors_Phone/${id}/${phone}`
    );
  }
  //addPhone() {}
}
