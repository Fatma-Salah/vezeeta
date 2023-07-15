import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private doctorService: DoctorService) {}
  id = 17;
  doctor: any;
  succFlag = false;
  ngOnInit(): void {
    this.doctorService.getDoctorById(this.id).subscribe({
      next: (res) => {
        this.doctor = res.body;
      },
    });
  }

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    CnewPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get passwordController() {
    return this.passwordForm.controls.oldPassword;
  }
  get newpasswordController() {
    return this.passwordForm.controls.newPassword;
  }
  get CnewpasswordController() {
    return this.passwordForm.controls.CnewPassword;
  }

  passwordFlag = true;
  passNotmatch = false;
  onPassChange(e: Event) {
    this.passwordFlag = true;
    this.succFlag = false;
    console.log(this.passwordController.value);
    if (this.passwordForm.valid) {
      console.log(this.doctor.password);
      console.log(this.passwordController.value);
      if (this.passwordController.value === this.doctor.password) {
        if (
          this.newpasswordController.value === this.CnewpasswordController.value
        ) {
          this.doctor.password = this.newpasswordController.value;
          this.doctorService
            .updateDoctorInfo(this.doctor.id, this.doctor)
            .subscribe((res) => {
              console.log(res);
              alert('تم التغيير بنجاح');
              this.succFlag = true;
            });
        } else {
          console.log(this.newpasswordController.value);
          this.passNotmatch = true;
        }
      } else {
        console.log(this.passwordController.value);
        this.passwordFlag = false;
      }
    }
  }
}
