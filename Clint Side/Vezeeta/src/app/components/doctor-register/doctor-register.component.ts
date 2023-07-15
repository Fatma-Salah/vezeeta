import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Idoctor } from 'src/app/Interfaces/idoctor';
import { IdoctorPhone } from 'src/app/Interfaces/idoctor-phone';
import { DoctorPhonesService } from 'src/app/Services/Entity_Services/doctor-phones.service';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css'],
})
export class DoctorRegisterComponent implements OnInit {
  //  constructor
  constructor(
    private doctorService: DoctorService,
    private specService: SpecializationService,
    private drPhoneServ: DoctorPhonesService
  ) {}
  //------------------------------------------

  //fields
  doctor: Idoctor | undefined;
  specs: any;
  lineIndex: number = 0;
  emailExist = false;
  phone1Exist: any;
  phone2Exist: any;
  FirstSectionValid = true;
  SecondSectionValid = true;
  ThirdSectionValid = true;
  clickpress = false;
  noOfPhone = 0;
  formFlag = true;
  dr_phone: IdoctorPhone[] = [];
  phone: IdoctorPhone = { dr_id: 0, phone: '' };
  image = new FormControl();
  verification = new FormControl();
  confirmPassFlag = false;
  registerCompleted = false;
  //------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.lineIndex = 0;

    // doctor initilzer
    this.doctor = {
      email: '',
      password: '',
      name: '',
      Doctors_Phones: this.dr_phone,
      gender: 'm',
      id_specialize: 0,
      description: '',
      waiting_time: '',
      image: '',
      verification: '',
      online_fees: 0,
      birth_date: new Date(),
      experience: 0,
    };

    this.specService.GetAll().subscribe((res) => {
      this.specs = res.body;
      console.log(this.specs);
    });
  }

  DoctorRegisterForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    gender: new FormControl('f', [Validators.required]),
    id_specialize: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    online_fees: new FormControl('0'),
    birth_date: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    verification: new FormControl('', [Validators.required]),
    Doctors_Phone1: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0-9]{9}$/),
    ]),
    Doctors_Phone2: new FormControl('', [Validators.min(11)]),
    description: new FormControl(''),
    waiting_time: new FormControl('0'),
  });

  get emailController() {
    return this.DoctorRegisterForm.controls.email;
  }
  get nameController() {
    return this.DoctorRegisterForm.controls.name;
  }
  get passwordController() {
    return this.DoctorRegisterForm.controls.password;
  }
  get CpasswordController() {
    return this.DoctorRegisterForm.controls.confirmPassword;
  }

  get genderController() {
    return this.DoctorRegisterForm.controls.gender;
  }
  get imageController() {
    return this.DoctorRegisterForm.controls.image;
  }
  get id_specializeController() {
    return this.DoctorRegisterForm.controls.id_specialize;
  }
  get online_feesController() {
    return this.DoctorRegisterForm.controls.online_fees;
  }
  get birth_dateController() {
    return this.DoctorRegisterForm.controls.birth_date;
  }
  get experienceController() {
    return this.DoctorRegisterForm.controls.experience;
  }
  get verificationController() {
    return this.DoctorRegisterForm.controls.verification;
  }
  get DoctorsphoneController1() {
    return this.DoctorRegisterForm.controls.Doctors_Phone1;
  }
  get DoctorsphoneController2() {
    return this.DoctorRegisterForm.controls.Doctors_Phone2;
  }
  get decriptionController() {
    return this.DoctorRegisterForm.controls.description;
  }
  get waitTimeController() {
    return this.DoctorRegisterForm.controls.waiting_time;
  }

  goNext(e: Event) {
    // flags used
    this.emailExist = false;
    this.FirstSectionValid = false;
    this.SecondSectionValid = false;
    this.clickpress = false;
    this.confirmPassFlag = false;
    //-----------------------------------------------------

    if (this.lineIndex === 0) {
      if (
        this.emailController.valid &&
        this.emailController.value &&
        this.nameController.valid &&
        this.passwordController.valid &&
        this.CpasswordController.valid
      ) {
        this.doctorService.getByMail(this.emailController.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 200) {
              this.emailExist = true;
            } else if (
              this.passwordController.value !== this.CpasswordController.value
            )
              this.confirmPassFlag = true;
            else if (res.status == 204) {
              this.FirstSectionValid = true;
              this.lineIndex++;
              console.log(this.lineIndex);
              console.log(this.FirstSectionValid);
            }
          },
        });
      } else {
        this.FirstSectionValid = false;
        this.lineIndex = 0;
        this.clickpress = true;
      }
    } else if (this.lineIndex === 1) {
      if (
        this.DoctorsphoneController1.valid &&
        this.DoctorsphoneController1.value &&
        this.experienceController.valid &&
        this.birth_dateController.valid
      ) {
        this.drPhoneServ
          .getDoctorByPhone(this.DoctorsphoneController1.value)
          .subscribe({
            next: (res) => {
              if (res.status == 200) {
                this.phone1Exist = true;
                this.SecondSectionValid = false;
                this.lineIndex = 1;
              } else if (res.status == 204) {
                if (this.lineIndex === 0) {
                  this.FirstSectionValid = true;
                  this.lineIndex++;
                } else if (this.lineIndex === 1) {
                  this.phone1Exist = false;
                  this.lineIndex++;
                  if (this.DoctorsphoneController1.value)
                    this.phone.phone = this.DoctorsphoneController1.value;
                  this.dr_phone.push(this.phone);
                }
              }
            },
          });
      } else {
        this.SecondSectionValid = false;
        console.log(this.lineIndex);
      }
    }
  }

  goBack() {
    this.lineIndex--;
    console.log(this.lineIndex);
  }

  imagechange(e: any) {
    const selectedfile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    //reader.abort();
    reader.onload = (event) => {
      if (typeof reader.result == 'string')
        //this.imageController.setValue(reader.result);
        this.image.setValue(reader.result);
      console.log(this.imageController.value);
    };
  }
  verfchange(e: any) {
    const selectedfile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    //reader.abort();
    reader.onload = (event) => {
      if (typeof reader.result == 'string')
        //this.verificationController.setValue(reader.result);
        this.verification.setValue(reader.result);
      console.log(this.verificationController.value);
    };
  }

  onSubmit(e: Event) {
    this.registerCompleted = false;
    if (this.DoctorRegisterForm.valid) {
      const model: any = {
        email: this.emailController.value,
        name: this.nameController.value,
        password: this.passwordController.value,
        Doctors_Phones: this.dr_phone,
        experience: this.experienceController.value,
        id_specialize: this.id_specializeController.value,
        image: this.image.value,
        verification: this.verification.value,
        birth_date: this.birth_dateController.value,
        online_fees: this.online_feesController.value,
        waiting_time: this.waitTimeController.value,
        description: this.decriptionController.value,
        gender: this.genderController.value,
      };
      console.log(model);
      this.doctorService.addNewDoctor(model).subscribe((res) => {
        console.log(res);
        this.registerCompleted = true;
      });
    } else e.preventDefault();
  }

  // addAnotherPhone() {
  //   this.noOfPhone = 1;
  // }
  // removePhone() {
  //   this.noOfPhone = 0;
  // }
}
