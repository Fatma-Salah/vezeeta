import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { AddressService } from 'src/app/Services/Entity_Services/address.service';
import { ClinicDoctorService } from 'src/app/Services/Entity_Services/clinic-doctor.service';
import { ClinicService } from 'src/app/Services/Entity_Services/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
})
export class ClinicComponent implements OnInit {
  /**
   *
   */
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(
    private http: HttpClient,
    private clinicSer: ClinicService,
    private clinicDrSer: ClinicDoctorService,
    private addServ: AddressService
  ) {}
  ngOnInit(): void {
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
          console.log(this.regions);
        }
      });
    // get Clinic
    this.getClinic();
  }
  id = 17;
  cities: any;
  regions: any;
  selectRegion: any = [];
  Dr_clinic: any = {};
  updateClinicFlag: any = false;
  UpdateclinicForm: FormGroup | any;
  updatClinic() {
    this.UpdateclinicForm = new FormGroup({
      ucity: new FormControl('', [Validators.required]),
      ust: new FormControl(this.Dr_clinic?.clinic?.address?.street, [
        Validators.required,
      ]),
      ubuilding: new FormControl(this.Dr_clinic?.clinic?.address?.building),
      uClinicPhone: new FormControl(this.Dr_clinic?.clinic?.phone, [
        Validators.required,
      ]),
      ufloor: new FormControl(this.Dr_clinic?.clinic?.address?.floor_num, [
        Validators.required,
      ]),
      uregion: new FormControl(this.Dr_clinic?.clinic?.address?.building, [
        Validators.required,
      ]),
      uclinicName: new FormControl(this.Dr_clinic?.clinic?.name, [
        Validators.required,
      ]),
      u_sq: new FormControl(this.Dr_clinic?.clinic?.address?.building),
      u_appart: new FormControl(this.Dr_clinic?.clinic?.address?.flat_num, [
        Validators.required,
      ]),
      u_descr: new FormControl(this.Dr_clinic?.clinic?.address?.notes),
      fees: new FormControl(this.Dr_clinic.fees),
    });
  }
  get usqController() {
    return this.UpdateclinicForm.controls.u_sq;
  }
  get udescController() {
    return this.UpdateclinicForm.controls.u_descr;
  }
  get uappartController() {
    return this.UpdateclinicForm.controls.u_appart;
  }
  get ucityController() {
    return this.UpdateclinicForm.controls.ucity;
  }

  get ustController() {
    return this.UpdateclinicForm.controls.ust;
  }

  get ubuildingController() {
    return this.UpdateclinicForm.controls.ubuilding;
  }

  get uclinicPhoneController() {
    return this.UpdateclinicForm.controls.uClinicPhone;
  }

  get ufloorController() {
    return this.UpdateclinicForm.controls.ufloor;
  }

  get uregionController() {
    return this.UpdateclinicForm.controls.uregion;
  }

  get uclinicNameController() {
    return this.UpdateclinicForm.controls.uclinicName;
  }
  get feescontroller() {
    return this.UpdateclinicForm.controls.fees;
  }

  // get clinic of doctor
  city1: any;
  getClinic() {
    this.http
      .get(`https://localhost:7018/api/Dr_clinic/${this.id}`, this.options)
      .subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.Dr_clinic = res.body;
            console.log(this.Dr_clinic);
            console.log(this.Dr_clinic?.clinic?.address?.street);
            this.updatClinic();
            this.updateClinicFlag = true;
            this.http
              .get(
                `https://localhost:7018/api/city/${this.Dr_clinic?.clinic?.address?.city_id}`,
                this.options
              )
              .subscribe((res) => {
                console.log(res);
                this.city1 = res.body;
                console.log(this.city1?.name);
                this.ucityController.setValue(this.city1?.region?.name);
                this.uregionController.setValue(this.city1?.name);
              });
          }
        },
      });
  }
  cityChange(e: any, inp: any) {
    this.selectRegion = [];
    for (let i = 0; i < this.regions.length; i++) {
      if (this.regions[i].region_id == e.target.value) {
        this.selectRegion.push(this.regions[i]);
      }
    }
  }
  clUpdateFlag = true;
  updateClinic() {
    this.clUpdateFlag = true;
    if (this.UpdateclinicForm.valid) {
      const model = {
        id: this.Dr_clinic.clinic.id,
        name: this.uclinicNameController.value,
        phone: this.uclinicPhoneController.value,
      };
      const address = {
        street: this.ustController.value,
        square: this.usqController.value,
        building: this.ubuildingController.value,
        floor_num: this.ufloorController.value,
        flat_num: this.uappartController.value,
        notes: this.udescController.value,
        city_id: this.uregionController.value,
        clinic_id: this.Dr_clinic.clinic.id,
        id: this.Dr_clinic.clinic.address.id,
      };
      const clinic_Doctors = {
        dr_id: this.id,
        clinic_id: this.Dr_clinic.clinic.id,
        fees: this.feescontroller.value,
      };
      this.clinicSer
        .updateClinic(this.Dr_clinic.clinic.id, model)
        .subscribe((res) => {
          if (res.status == 200) console.log(res);
        });
      this.clinicDrSer
        .updateDoctor_Clinic(this.id, this.Dr_clinic.clinic.id, clinic_Doctors)
        .subscribe();
      this.addServ
        .Update(this.Dr_clinic.clinic.address.id, address)
        .subscribe((res) => {
          alert('تم التعديل ينجاح');
        });
      //console.log(model);
    } else {
      this.clUpdateFlag = false;
    }
  }
}
