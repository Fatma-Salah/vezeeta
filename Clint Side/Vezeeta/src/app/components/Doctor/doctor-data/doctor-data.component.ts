import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';

@Component({
  selector: 'app-doctor-data',
  templateUrl: './doctor-data.component.html',
  styleUrls: ['./doctor-data.component.css'],
})
export class DoctorDataComponent implements OnInit {
  constructor(
    private doctorService: DoctorService,
    private activRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  //options
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  //fields
  id: number | any;
  doctor: any;
  Dr_clinic: any;
  clinicLoad = false;
  doctorLoad = false;
  //onint
  ngOnInit(): void {
    this.id = this.activRoute.snapshot.paramMap.get('id');
    this.doctorService.getDoctorById(this.id).subscribe((res) => {
      this.doctor = res.body;
      console.log(this.doctor);
      this.doctorLoad = true;
    });
    this.http
      .get(`https://localhost:7018/api/Dr_clinic/${this.id}`, this.options)
      .subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.Dr_clinic = res.body;
            console.log(this.Dr_clinic);
            this.clinicLoad = true;
          }
        },
      });
  }
}
