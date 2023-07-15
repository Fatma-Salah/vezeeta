import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnswerURLs } from 'src/app/Environment/App.Const';
import { IAnswer } from 'src/app/Interfaces/ianswer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAll(Q_id:number){
    return this.http.get(AnswerURLs.Get(Q_id),this.options);
  }
  GetById(Q_id:number,Dr_id:number){
    return this.http.get(AnswerURLs.GetById_Put_Delete(Q_id,Dr_id),this.options);
  }
  Add(answer:IAnswer){
    return this.http.post(AnswerURLs.Post(),answer,this.options);
  }
  Update(Q_id:number,Dr_id:number,answer:IAnswer){
    return this.http.put(AnswerURLs.GetById_Put_Delete(Q_id,Dr_id),answer,this.options);
  }
  Delete(Q_id:number,Dr_id:number){
    return this.http.delete(AnswerURLs.GetById_Put_Delete(Q_id,Dr_id),this.options)
  }
}
