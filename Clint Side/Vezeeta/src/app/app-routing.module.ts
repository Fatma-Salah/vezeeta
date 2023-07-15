import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { PatientAccountComponent } from './components/Accounts/patient-account/patient-account.component';
import { PatientAppointmentComponent } from './components/patient/patient-appointment/patient-appointment.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ViewQuestionComponent } from './components/questions/view-question/view-question.component';
import { SpecilizationComponent } from './components/questions/specilization/specilization.component';
import { QuestionsComponent } from './components/questions/ask-question/questions.component';
import { PatientQuestionsComponent } from './components/questions/patient-questions/patient-questions.component';
import { HomeComponent } from './components/home/home.component';
import { ClinicComponent } from './components/clinic/clinic.component';
import { SearchComponent } from './components/home/Components/search/search.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginAdminComponent } from './components/login/login-admin/login-admin.component';
import { LoginDoctorComponent } from './components/login/login-doctor/login-doctor.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ChangePasswordComponent } from './components/Doctor/change-password/change-password.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorDataComponent } from './components/Doctor/doctor-data/doctor-data.component';



const routes: Routes = [
  {path:'',component:HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'login/doctor', component: LoginDoctorComponent },
  { path: 'register/doctor', component: DoctorRegisterComponent },
  { path: 'registerPatient', component: RegisterPatientComponent },
  {path:'account' ,component:PatientAccountComponent },
  {path:'patientAppoint' , component:PatientAppointmentComponent},
  {path:'forgetPass' , component:ForgetPasswordComponent},
  {path:'questions/view/:id',component:ViewQuestionComponent},
  {path:'questions/specializations',component:SpecilizationComponent},
  {path:'questions/ask',component:QuestionsComponent},
  {path:'questions/patient',component:PatientQuestionsComponent},
  { path: 'updateClinic/:id', component: ClinicComponent },
  { path: 'search', component: SearchPageComponent },
  {path:'resetPassword' , component:ResetPasswordComponent},
  {path:'confirmCode' , component:ConfirmCodeComponent},
  { path: 'doctor/changePassword', component: ChangePasswordComponent },
  { path: 'doctor/profile', component: DoctorProfileComponent },
  { path: 'doctor/data/:id', component: DoctorDataComponent },
  {path:'**',  component:ErrorComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
