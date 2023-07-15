import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinic_doctorURLs } from 'src/app/Environment/App.Const';
import { IclinicDoctor } from 'src/app/Interfaces/iclinic-doctor';

@Injectable({
  providedIn: 'root',
})
export class ClinicDoctorService {
  constructor(private http: HttpClient) {}
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  getAll() {
    return this.http.get(Clinic_doctorURLs.Get_Post());
  }
  getClinicsByDrId(D_id: number) {
    return this.http.get(
      Clinic_doctorURLs.GetById_Put_Delete(D_id),
      this.options
    );
  }

  getClinic_Doctor(id: number, C_id: number) {
    return this.http.get(
      `${Clinic_doctorURLs.GetById_Put_Delete(id)}/${C_id}`,
      this.options
    );
  }

  addNewDoctorToClinic(clinic_dr: IclinicDoctor) {
    return this.http.post(
      Clinic_doctorURLs.Get_Post(),
      clinic_dr,
      this.options
    );
  }
  updateDoctor_Clinic(id: number, Cl_id: number, clinic_dr: any) {
    return this.http.put(
      `${Clinic_doctorURLs.GetById_Put_Delete(id)}/${Cl_id}`,
      clinic_dr,
      this.options
    );
  }
  deleteDoctor_Clinic(id: number) {
    return this.http.delete(
      Clinic_doctorURLs.GetById_Put_Delete(id),
      this.options
    );
  }
}
