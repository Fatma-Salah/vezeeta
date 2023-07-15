import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CityURLs } from 'src/app/Environment/App.Const';
import { IdoctorPhone } from 'src/app/Interfaces/idoctor-phone';
import { ClinicService } from 'src/app/Services/Entity_Services/clinic.service';
import { DoctorPhonesService } from 'src/app/Services/Entity_Services/doctor-phones.service';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private doctorService: DoctorService,
    private specService: SpecializationService,
    private activateRoute: ActivatedRoute,
    private drPhoneServ: DoctorPhonesService,
    private http: HttpClient,
    private clinicSer: ClinicService
  ) {}
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  ngAfterViewInit(): void {}
  // fields
  id = 17;
  doctor: any;
  specs: any;
  doctor_phones: any = [];
  emailExist = false;
  phone1Exist: any;
  phoneValid: any;
  image = new FormControl();
  verification = new FormControl();
  noOfPhone = 0;
  clickPress = false;
  phone: IdoctorPhone = { dr_id: 0, phone: '' };
  formGroupFlag = false;
  addFlage: boolean = false;
  DoctorUpdateForm: FormGroup | any;
  doctorPhoneForm: FormGroup | any;
  cities: any;
  regions: any;
  selectRegion: any = [];
  Dr_clinic: any = {};
  updateClinicFlag: any = false;
  loaderDr = false;
  dateOfBirth = new Date();
  formatDate: any;
  DrSpec: any;
  // -----------------------------------------------------------------------
  ngOnInit(): void {
    this.formGroupFlag = false;
    this.doctorService.getDoctorById(this.id).subscribe({
      next: (res) => {
        this.doctor = res.body;
        this.DrSpec = this.doctor?.id_specializeNavigation.name;
        console.log(this.doctor);
        this.noOfPhone = this.doctor_phones.length;

        this.dateOfBirth = new Date(this.doctor?.birth_date);
        console.log(this.dateOfBirth);
        let year = this.dateOfBirth.getFullYear();
        let month = (this.dateOfBirth.getMonth() + 1)
          .toString()
          .padStart(2, '0');
        let day = this.dateOfBirth.getDate().toString().padStart(2, '0');
        this.formatDate = `${year}-${month}-${day}`;
        this.loaderDr = true;
        console.log(this.formatDate);
      },
      complete: () => {
        this.CreatForm();
        this.createForm2();
        this.formGroupFlag = true;
      },
    });
    this.specService.GetAll().subscribe((res) => {
      this.specs = res.body;
    });
    this.drPhoneServ.getByDoctorId(this.id).subscribe((re2) => {
      console.log(re2);
      if (re2.status == 200) {
        this.doctor_phones = re2.body;
      }
    });

    //city url
    this.http
      .get('https://localhost:7018/api/Reigons', this.options)
      .subscribe((res) => {
        if (res.status == 200) {
          this.cities = res.body;
          console.log(this.cities);
        }
      });
    //region url
    this.http
      .get('https://localhost:7018/api/City', this.options)
      .subscribe((res) => {
        if (res.status == 200) {
          this.regions = res.body;
        }
      });

    //get clinic url
    this.http
      .get(`https://localhost:7018/api/Dr_clinic/${this.id}`, this.options)
      .subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.Dr_clinic = res.body;

            this.updateClinicFlag = true;
          }
        },
      });
  }

  // end of on init

  //start of forms
  CreatForm() {
    this.DoctorUpdateForm = new FormGroup({
      email: new FormControl(this.doctor?.email, [
        Validators.email,
        Validators.required,
      ]),

      name: new FormControl(this.doctor?.name, [
        Validators.required,
        Validators.minLength(6),
      ]),
      gender: new FormControl(this.doctor?.gender, [Validators.required]),
      id_specialize: new FormControl(this.doctor?.id_specialize, [
        Validators.required,
      ]),
      image: new FormControl(this.doctor?.image, [Validators.required]),
      online_fees: new FormControl(this.doctor?.online_fees),
      birth_date: new FormControl(this.formatDate, [Validators.required]),
      experience: new FormControl(this.doctor?.experience, [
        Validators.required,
      ]),
      verification: new FormControl(this.doctor?.verification, [
        Validators.required,
      ]),

      description: new FormControl(this.doctor?.description),
      waiting_time: new FormControl(this.doctor?.waiting_time),
    });
  }

  createForm2() {
    this.doctorPhoneForm = new FormGroup({
      Doctors_Phone1: new FormControl(this.doctor_phones[0]['phone'], [
        Validators.required,
        Validators.pattern(/^01[0-9]{9}$/),
      ]),

      Doctors_Phone2: new FormControl(this.doctor_phones[1]?.phone, [
        Validators.pattern(/^01[0-9]{9}$/),
      ]),
      // Doctors_Phone3: new FormControl(this?.doctor_phones[2]?.['phone'], [
      //   Validators.required,
      //   Validators.pattern(/^01[0-9]{9}$/),
      // ]),
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

  clinicForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    st: new FormControl('', [Validators.required]),
    building: new FormControl('', [Validators.required]),
    ClinicPhone: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    clinicName: new FormControl('', [Validators.required]),
    sq: new FormControl('', [Validators.required]),
    appart: new FormControl('', [Validators.required]),
    descr: new FormControl(''),
    fees: new FormControl(''),
  });

  // end of form group creation

  // update info
  get emailController() {
    return this.DoctorUpdateForm.controls.email;
  }
  get nameController() {
    return this.DoctorUpdateForm.controls.name;
  }

  get passwordController() {
    return this.passwordForm.controls.oldPassword;
  }
  get newpasswordController() {
    return this.passwordForm.controls.newPassword;
  }
  get CnewpasswordController() {
    return this.passwordForm.controls.CnewPassword;
  }

  get genderController() {
    return this.DoctorUpdateForm.controls.gender;
  }
  get imageController() {
    return this.DoctorUpdateForm.controls.image;
  }
  get id_specializeController() {
    return this.DoctorUpdateForm.controls.id_specialize;
  }
  get online_feesController() {
    return this.DoctorUpdateForm.controls.online_fees;
  }
  get birth_dateController() {
    return this.DoctorUpdateForm.controls.birth_date;
  }
  get experienceController() {
    return this.DoctorUpdateForm.controls.experience;
  }
  get verificationController() {
    return this.DoctorUpdateForm.controls.verification;
  }
  get DoctorsphoneController1() {
    return this.doctorPhoneForm.controls.Doctors_Phone1;
  }
  get DoctorsphoneController2() {
    return this.doctorPhoneForm.controls.Doctors_Phone2;
  }

  get decriptionController() {
    return this.DoctorUpdateForm.controls.description;
  }
  get waitTimeController() {
    return this.DoctorUpdateForm.controls.waiting_time;
  }

  //clinic info

  get sqController() {
    return this.clinicForm.controls.sq;
  }
  get descController() {
    return this.clinicForm.controls.descr;
  }
  get appartController() {
    return this.clinicForm.controls.appart;
  }
  get cityController() {
    return this.clinicForm.controls.city;
  }

  get stController() {
    return this.clinicForm.controls.st;
  }

  get buildingController() {
    return this.clinicForm.controls.building;
  }

  get clinicPhoneController() {
    return this.clinicForm.controls.ClinicPhone;
  }

  get floorController() {
    return this.clinicForm.controls.floor;
  }

  get regionController() {
    return this.clinicForm.controls.region;
  }

  get clinicNameController() {
    return this.clinicForm.controls.clinicName;
  }
  get feesController() {
    return this.clinicForm.controls.fees;
  }
  //------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------
  addAnotherPhone(inptval: any) {
    this.phone1Exist = false;
    console.log(inptval.value);
    const phoneNumber = inptval.value;
    const egyptianPhoneRegex = /^01[0-9]{9}$/;
    if (egyptianPhoneRegex.test(phoneNumber)) {
      // Phone number is valid
      const model = { Dr_id: this.doctor.id, phone: inptval.value };
      this.drPhoneServ.getDoctorByPhone(inptval.value).subscribe((res) => {
        console.log(res);
        if (res.status == 204) {
          this.drPhoneServ.addNewPhone(model).subscribe((res1) => {
            this.doctor_phones.push(model);
            inptval.value = '';
            this.noOfPhone++;
          });
        }
        if (res.status == 200) {
          this.phone1Exist = true;
        }
      });
    } else {
      // Phone number is invalid
      this.phoneValid = false;
    }
  }
  removePhone(e: any, ev: any) {
    console.log(e.value);
    if (confirm('هل انت متأكد')) {
      this.drPhoneServ.deletePhone(this.doctor.id, e.value).subscribe((res) => {
        ev.target.parentElement.remove();
        this.noOfPhone--;
      });
    }
  }
  imagechange(e: any) {
    const selectedfile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    //reader.abort();
    reader.onload = (event) => {
      //this.imageController.setValue(reader.result);
      this.image.setValue(reader.result);
      this.doctor.image = reader.result;
      console.log(this.doctor.image);
      console.log(this.doctor);
      this.doctorService
        .updateDoctorInfo(this.doctor.id, this.doctor)
        .subscribe((res) => {
          console.log(res);
        });
    };
  }

  onSubmit(e: Event) {
    this.addFlage = false;
    if (this.DoctorUpdateForm.valid) {
      this.doctor.update_at = Date.now();
      this.doctor.name = this.nameController.value;
      this.doctor.email = this.emailController.value;
      this.doctor.waiting_time = this.waitTimeController.value;
      this.doctor.experience = this.experienceController.value;
      this.doctor.online_fees = this.online_feesController.value;
      this.doctor.description = this.decriptionController.value;
      this.doctor.gender = this.genderController.value;
      this.doctor.id_specialize = this.id_specializeController.value;
      this.doctor.birth_date = this.birth_dateController.value;
      this.doctorService
        .updateDoctorInfo(this.doctor.id, this.doctor)
        .subscribe((res) => {
          console.log(res);
          this.addFlage = true;
          alert('تم التعديل بنجاح');
        });
      // if (this.addFlage) {
      //   if (this.doctor_phones.length === 1) {
      //     this.drPhoneServ.addNewPhone(this.doctor_phones[1]).subscribe({
      //       next: (res2) => {
      //         console.log('asdfg');
      //         console.log(res2);
      //       },
      //     });
      //   }
      // }
    } else {
      e.preventDefault();
      console.log(this.DoctorUpdateForm.value);
    }
  }

  onPhoneSubmit(e: Event) {}

  passwordFlag = true;
  succFlag = false;
  onPassChange(e: Event) {
    this.passwordFlag = true;
    this.succFlag = false;
    console.log(this.passwordController.value);
    if (this.passwordForm.valid) {
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
              this.passwordController.setValue('');
              this.newpasswordController.setValue('');
              this.CnewpasswordController.setValue('');
              this.succFlag = true;
            });
        }
      } else {
        console.log(this.passwordController.value);
        this.passwordFlag = false;
      }
    }
  }

  cityChange(e: any, inp: any) {
    this.selectRegion = [];
    for (let i = 0; i < this.regions.length; i++) {
      if (this.regions[i].region_id == e.target.value) {
        this.selectRegion.push(this.regions[i]);
      }
    }
  }

  clinincAdd() {
    if (this.clinicForm.valid) {
      const model = {
        name: this.clinicNameController.value,
        phone: this.clinicPhoneController.value,
        address: {
          street: this.stController.value,
          square: this.sqController.value,
          building: this.buildingController.value,
          floor_num: this.floorController.value,
          flat_num: this.appartController.value,
          notes: this.descController.value,
          city_id: this.regionController.value,
        },
        clinic_Doctors: [
          {
            dr_id: this.doctor.id,
          },
        ],
      };
      console.log(model);
      this.clinicSer.addNewClinic(model).subscribe((res) => {
        if (res.status == 200) {
          console.log(res);
          this.updateClinicFlag = true;
        }
      });
    }
  }

  updateClinic() {}
}
