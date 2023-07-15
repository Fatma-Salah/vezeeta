//////////////////////* This is used to get the URLs of the api and to make it more maintainable *//////////////////////////////////

import { IAddAppointToPatient } from "../Interfaces/iadd-appoint-to-patient";

const Base_URl = 'https://localhost:7018/api';
//////////////////////////////////////////////

export class AuthURLs {
  public static Admin_Login() {
    return `${Base_URl}/login/admin`;
  }
  public static Doctor_Login() {
    return `${Base_URl}/login/Doctor`;
  }
  public static Patient_Login() {
    return `${Base_URl}/login/Patient`;
  }
}

export class SpecializationURLs {
  public static Get_Post() {
    return `${Base_URl}/Specializations`;
  }
  public static GetById_Put_Delete(spec_id: number) {
    return `${Base_URl}/Specializations/${spec_id}`;
  }
}

export class QuestionURLs {
  public static Get_Post() {
    return `${Base_URl}/Questions`;
  }
  public static GetById_Put_Delete(Q_id: number) {
    return `${Base_URl}/Questions/${Q_id}`;
  }
}

export class AnswerURLs {
  public static Get(Q_id: number) {
    return `${Base_URl}/Answers/${Q_id}`;
  }
  public static Post() {
    return `${Base_URl}/Answers`;
  }
  public static GetById_Put_Delete(Q_id: number, Dr_id: number) {
    return `${Base_URl}/Answers/${Q_id},${Dr_id}`;
  }
}

export class AppointmentURLs {
  public static Get(Dr_id: number) {
    return `${Base_URl}/Appointments/${Dr_id}`;
  }
  public static Post() {
    return `${Base_URl}/Appointments`;
  }
  public static GetById_Put_Delete(id: number, Dr_id: number) {
    return `${Base_URl}/Appointments/${id},${Dr_id}`;
  }
}

export class ClinicURLs {
  public static Get_Post() {
    return `${Base_URl}/Clinics`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Clinics/${id}`;
  }
}

export class DoctorURLs {
  public static Get_Post() {
    return `${Base_URl}/Doctors`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Doctors/${id}`;
  }
}

export class DoctorPhoneURLs {
  public static Get_Post() {
    return `${Base_URl}/Doctors_Phone`;
  }
  public static GetById(id: number) {
    return `${Base_URl}/Doctors_Phone/${id}`;
  }
  public static Delete(id: number, phone: number) {
    return `${Base_URl}/Doctors_Phone/${id}/${phone}`;
  }
}

export class PrescriptionURLs {
  public static GetByDoctor(Dr_id: number) {
    return `${Base_URl}/Prescriptions/Doctor/${Dr_id}`;
  }
  public static GetByPatient(Patient_id: number) {
    return `${Base_URl}/Prescriptions/patient/${Patient_id}`;
  }
  public static Post() {
    return `${Base_URl}/Prescriptions`;
  }
  public static GetById_Put_Delete(Dr_id: number, patient_id: number) {
    return `${Base_URl}/Prescriptions/${Dr_id},${patient_id}`;
  }
}

export class PatientURLs {
  public static Get_Post() {
    return `${Base_URl}/Patients`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Patients/${id}`;
  }
  public static GetByEmail(email: string) {
    return `${Base_URl}/Patients/${email}`;
  }
  public static PostByPassword(password: string) {
    return `${Base_URl}/Patients/${password}`;
  }
  public static GetWithQuetions(id:number){
    return `${Base_URl}/Patients/Questions/${id}`
  }
}

export class ReviewURLs {
  public static GetByDoctor(Dr_id: number) {
    return `${Base_URl}/Review/Doctor/${Dr_id}`;
  }
  public static GetByPatient(Patient_id: number) {
    return `${Base_URl}/Review/Patient/${Patient_id}`;
  }
  public static Post() {
    return `${Base_URl}/Review`;
  }
  public static GetById_Put_Delete(Dr_id: number, patient_id: number) {
    return `${Base_URl}/Review/${Dr_id},${patient_id}`;
  } //put has isseue and need to be modified in api  doesn't have the composit primary key
}

export class ReigonURLs {
  public static Get_Post() {
    return `${Base_URl}/Reigons`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Reigons/${id}`;
  }
}

export class Clinic_doctorURLs {
  public static Get_Post() {
    return `${Base_URl}/Clinic_Doctor`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Clinic_Doctor/${id}`;
  }
}

export class CityURLs {
  public static Get_Post() {
    return `${Base_URl}/City`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/City/${id}`;
  }
}

export class AddressURLs {
  public static Get_Post() {
    return `${Base_URl}/Address`;
  }
  public static GetById_Put_Delete(id: number) {
    return `${Base_URl}/Address/${id}`;
  }
}


export class Patient_AppointmentURLs{
    public static Post(patient_appoint:IAddAppointToPatient,patient_id:number){
        return `${Base_URl}/Patient_Appoinment`;
    }
    public static GetById(id:number){
        return `${Base_URl}/Patient_Appoinment/${id}`;
    }
    public static Delete_Put(appoint_id:number,patient_id:number){
        return `${Base_URl}/Patient_Appoinment/${appoint_id}/${patient_id}`;
    }
}
export class SearchURLs {
    public static Get_Post() {
        return `${Base_URl}/Values`;
    }
}