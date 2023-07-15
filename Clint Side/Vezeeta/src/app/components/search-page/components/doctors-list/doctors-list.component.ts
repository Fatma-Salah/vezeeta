import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctors_List_Genrate } from 'src/app/Environment/DoctorList';
import { SearchTemp } from 'src/app/Environment/SearchTemp';
import { SearchService } from 'src/app/Services/Entity_Services/search.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
import { ISearch } from './../../../../Interfaces/i-search';
import { AppoinmentService } from './../../../../Services/Entity_Services/appoinment.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  doctorslist: any;
  holderlist: any;
  specalizationlist: any;
  load: boolean = true;
  flag: boolean = true;

  apointmentslist: any;
  constructor(private activatedrot: ActivatedRoute, private search: SearchService, private specialization: SpecializationService, private appointment: AppoinmentService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.activatedrot.queryParams.subscribe(params => {
      let temp: ISearch = {
        City: params["city"],
        Reigon: params["reigon"],
        Fese: 0,
        Gender: "",
        Name: params["name"],
        Specialization: params["special"]
      }

      if (temp["City"] != 0 || temp["Reigon"] != 0)
        this.holderlist = Doctors_List_Genrate.GetListbyReigonAndCity(this.doctorslist, temp["Reigon"], temp["City"])
      else
        this.holderlist = Doctors_List_Genrate.GetList(this.doctorslist)

      this.doctorslist = this.holderlist

    })
  }
  ngOnInit(): void {

    this.activatedrot.queryParams.subscribe(params => {
      let temp: ISearch = {
        City: params["city"],
        Reigon: params["reigon"],
        Fese: 0,
        Gender: "",
        Name: params["name"],
        Specialization: params["special"]
      }

      console.log(temp)


      this.search.Search(temp).subscribe(res => {

        this.doctorslist = res;

        this.specialization.GetAll().subscribe(res => {
          this.specalizationlist = res.body
          this.load = false

          console.log(this.specalizationlist)

        })


        if (temp["City"] != 0 || temp["Reigon"] != 0)
          this.holderlist = Doctors_List_Genrate.GetListbyReigonAndCity(this.doctorslist, temp["Reigon"], temp["City"])
        else
          this.holderlist = Doctors_List_Genrate.GetList(this.doctorslist)

        this.doctorslist = this.holderlist
        if (this.doctorslist.length != 0)
          this.flag = false
        console.log(this.doctorslist)


      })


    })
  }

  getSpecialById(id: Number) {
    return this.specalizationlist.filter((a: any) => a["id"] == id)[0].name
  }

  // constructor(private productService: SpecializationService, private router: Router) { }



  navigate(id: any) {
    alert(id)
    // this.router.navigate(
    //   ['/search'],
    //     { queryParams: { type: "b", city: 0, reigon: 0, name: "", special: id } }
    // );
  }
  getappointement(id: number) {
    let x;
    this.appointment.GetAllByDoctor(id).subscribe(res => {
      x = res.body;
    })
    return x;
  }

}
