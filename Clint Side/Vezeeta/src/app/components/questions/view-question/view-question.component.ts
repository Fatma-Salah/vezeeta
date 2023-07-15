import { DoctorService } from './../../../Services/Entity_Services/doctor.service';
import { AnswerService } from './../../../Services/Entity_Services/answer.service';
import { TokenService } from './../../../Services/Token/token.service';
import { ActivatedRoute } from '@angular/router';
import { SpecializationService } from './../../../Services/Entity_Services/specialization.service';
import { Component, OnInit } from '@angular/core';
import { IAnswer } from 'src/app/Interfaces/ianswer';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
  
})
export class ViewQuestionComponent implements OnInit {
  specId:number = 0;
  spec?:any;
  drId?:any;
  role?:any;
  doc:any;
  specoriginal?:any;
  first: number = 0;

  rows: number = 10;

  hasanswer:boolean = false;
  visible:boolean = false;
  answertitle?:any;
  notvalid:boolean = false;
  question?:any;
constructor(private specializationService:SpecializationService,
    private activatedroute:ActivatedRoute,
    private tokenService:TokenService,
    private answerService:AnswerService,
    private doctorService:DoctorService
    ){
  this.activatedroute.params.subscribe((params) => {
    this.specId = params['id'];
  });
}
  ngOnInit(): void {
    this.specializationService.GetById(this.specId).subscribe({
      next:(response:any) => {
        this.role = this.tokenService.GetRole();
        this.drId = this.tokenService.GetUserId();
        // console.log(response);
        // console.log(response.body);
        this.spec = response.body;
        this.specoriginal=response.body.questions;
       this.spec.questions=this.specoriginal.slice(this.first,this.rows);

        // console.log(this.spec);
        this.doctorService.getDoctorById(this.drId).subscribe(
          {
            next:(response:any) => {
             this.doc = response.body
            //  console.log(this.doc);
             
            },
            error: (e) => console.error(e),
            complete: () => console.info('Success')
          }
        )
        
        //this.questions=response.body
      },
      error: (e) => console.error(e),
      complete: () => console.info('Success')
    });
    
  }
  //paginator 
 
  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
      this.spec.questions=this.specoriginal.slice(this.first,this.rows+this.first);
  }
/////
  show(q:any){
    this.notvalid = false;
    this.answertitle = '';
    this.visible = true;
    this.hasanswer = false;
    this.question = q;
    q.answers.forEach((ans:any) => {
      
      if (this.drId == ans.dr.id) {
        this.hasanswer = true;
      }
    });
  }
  addanswer(){
    
    if (this.answertitle?.length <10 || this.answertitle == undefined) {
      this.notvalid = true;
    }
    else{
      let ans = {Dr_id:this.drId, Q_id:this.question.id,description:this.answertitle, dr:this.doc,create_at: new Date()}
      let answer:IAnswer = {Dr_id:this.drId, Q_id:this.question.id,description:this.answertitle}
      //console.log(answer);
      this.answerService.Add(answer).subscribe({
        next:(response:any) => {
          this.visible = false;
          //console.log(response);
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('Success')
          this.spec.questions.forEach((que:any) => {
            if (que.id == this.question.id) {
              que.answers.push(ans);
            }
          });
        }
      });
    }
    
  }

}
