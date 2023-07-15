import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICity } from 'src/app/Interfaces/i-city';
import { CityService } from 'src/app/Services/Entity_Services/city.service';
import { ReigonService } from 'src/app/Services/Entity_Services/reigon.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';

@Component({
  selector: 'app-search-top-bar',
  templateUrl: './search-top-bar.component.html',
  styleUrls: ['./search-top-bar.component.css']
})
export class SearchTopBarComponent {
  specializationList: any = []
  cityList: any = []
  regionList: any = []
  cityListholder: any;


  constructor(private specialization: SpecializationService, private city: CityService, private reigon: ReigonService, private activatedrot: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {

    this.specialization.GetAll().subscribe(response => {
      this.specializationList = response.body;
      // console.log(this.specializationList)
    })
    this.city.GetAll().subscribe(res => {
      // console.log(res.body)
      this.cityListholder = res.body
    })
    this.reigon.GetAll().subscribe(response => {
      this.regionList = response.body;
      // console.log(this.regionList)
    })
    this.activatedrot.queryParams.subscribe(params => {
      // console.log(Object.keys(params))
      this.fcontrol["name"].setValue(params["name"]);
      this.fcontrol["reigon"].setValue(params["reigon"]);
      this.fcontrol["city"].setValue(params["city"]);
      this.fcontrol["special"].setValue(params["special"]);
      // this.Form.controls.reigon.setValue(params["reigon"]);
      // this.Form.controls.special.setValue(params["special"]);
      // this.Form.controls.city.setValue(params["city"]);

    })
  }


  selectReigon(id: any) {
    let selectedreigon = this.regionList.find((element: any) => element.id == id);
    console.log(id)
    this.cityList = this.cityListholder.filter((a: any) => a["region_id"] == selectedreigon?.id);
  }

  Form = new FormGroup({
    special: new FormControl(0)
    , city: new FormControl(0)
    , reigon: new FormControl(0)
    , name: new FormControl('', [Validators.pattern("^[a-zA-Z]{1,30}$")])
  })
  get fvalues() {
    return this.Form.value;
  }

  get fcontrol() {
    return this.Form.controls;
  }
  onSubmit() {
    if (this.Form.invalid) alert("invalid")
    else {
      this.router.navigate(
        ['/search'],
        { queryParams: { type: "b", city: this.fvalues["city"], reigon: this.fvalues["reigon"], name: (this.fvalues["name"]), special: this.fvalues["special"] } }
      );

    }
  }

}
