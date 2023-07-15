import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../../../../Services/Entity_Services/specialization.service';
import { CityService } from '../../../../Services/Entity_Services/city.service';
import { ReigonService } from '../../../../Services/Entity_Services/reigon.service';
import { ICity } from '../../../../Interfaces/i-city';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // fildes
  specializationList: any = []
  cityList: any = []

  regionList: any = []
  cityListholder: any;
  // constructor
  constructor(private specialization: SpecializationService, private city: CityService, private reigon: ReigonService, private activatedrot: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.specialization.GetAll().subscribe(response => {
      this.specializationList = response.body;
    })

    this.city.GetAll().subscribe(res => {
      console.log(res.body)
      this.cityListholder = res.body
    })


    this.reigon.GetAll().subscribe(response => {
      this.regionList = response.body;
    })

  }

  selectReigon(id: any) {
    let selectedreigon = this.regionList.find((element: any) => element.id == id);
    console.log(id)
    this.cityList = this.cityListholder.filter((a: any) => a["region_id"] == selectedreigon.id);
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
