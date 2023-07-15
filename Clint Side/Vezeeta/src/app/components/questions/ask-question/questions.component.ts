import { TokenService } from './../../../Services/Token/token.service';
import { ISpecialization } from './../../../Interfaces/ispecialization';
import { QuestionService } from './../../../Services/Entity_Services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/Interfaces/iquestion';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  invalidinput=false;
  patientId?:any;
  spec:ISpecialization|undefined;
  specs?:ISpecialization[];
  stateOptions1: any[] = [
    { label: 'أنثى', value: 'f' },
    { label: 'ذكر', value: 'm' },


  ];
  stateOptions2: any[] = [
    { label: 'لشخص أخر', value: 'لشخص أخر' },
    { label: 'لنفسي', value: 'لنفسي' },


  ];
  constructor(private specService:SpecializationService, private router:Router, private questionService:QuestionService, private tokenService:TokenService){}
  ngOnInit(): void {
    this.patientId = this.tokenService.GetUserId();
    this.specService.GetAll().subscribe({
      next:(response:any) => {
        this.specs = response.body;
        this.spec = response.body[0];
      },
      error: (e) => console.error(e),
      complete: () => console.info('Success')
    })
  }
addquestionForm = new FormGroup({
// spec:new FormControl('',[Validators.required]),
title:new FormControl('',[Validators.required,Validators.maxLength(50)]),
desc:new FormControl('',[Validators.required,Validators.maxLength(250)]),
type:new FormControl(),
gender:new FormControl(),
age:new FormControl('',[Validators.required])
});
// get GetSpec(){
//   return this.addquestionForm.controls['spec'];
// }
get GetTitle(){
  return this.addquestionForm.controls['title'];
}get GetDesc(){
  return this.addquestionForm.controls['desc'];
}get GetType(){
  return this.addquestionForm.controls['type'];
}get GetGender(){
  return this.addquestionForm.controls['gender'];
}get GetAge(){
  return this.addquestionForm.controls['age'];
}

submitquestion(e:Event){
  e.preventDefault();
  if (this.addquestionForm.valid && this.GetType.value != null && this.GetGender.value != null) {
    localStorage.removeItem('QAdded');
    let question:IQuestion = {title:this.GetTitle.value,description:this.GetDesc.value,spec_id:this.spec?.id,type:this.GetType.value,gender:this.GetGender.value,age:Number(this.GetAge.value),patient_id:this.patientId};
    //console.log(question);
    
    this.questionService.Add(question).subscribe({
      next:(response:any) => {
        console.log(response);
        localStorage.setItem('QAdded','yes');
        
      },
      error: (e) => console.error(e),
      complete: () => console.info('Success')
    })
    this.router.navigate(['/questions/specializations']);
  } else {
    this.invalidinput=true;
  }
}
}
