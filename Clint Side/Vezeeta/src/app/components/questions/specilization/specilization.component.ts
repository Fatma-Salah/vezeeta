import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISpecialization } from 'src/app/Interfaces/ispecialization';

@Component({
  selector: 'app-specilization',
  templateUrl: './specilization.component.html',
  styleUrls: ['./specilization.component.css']
})
export class SpecilizationComponent implements OnInit {
  specs?:ISpecialization[];
  hasquestion?:string|null = null;
constructor(private specializationService:SpecializationService, private router:Router){}
  ngOnInit(): void {
    this.specializationService.GetAll().subscribe({
      next:(response:any) => {
        this.specs = response.body;
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('Success'),
      this.hasquestion = localStorage.getItem('QAdded');
      }
    })
  }
  show(spec_id:any){
    localStorage.removeItem('QAdded');
    this.router.navigate([`/questions/view/${spec_id}`]);
  }
}
