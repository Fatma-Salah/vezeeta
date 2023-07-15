import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionURLs } from 'src/app/Environment/App.Const';
import { IQuestion } from 'src/app/Interfaces/iquestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAll(){
    return this.http.get(QuestionURLs.Get_Post(),this.options);
  }
  GetById(Q_id:number){
    return this.http.get(QuestionURLs.GetById_Put_Delete(Q_id),this.options);
  }
  Add(question:IQuestion){
    return this.http.post(QuestionURLs.Get_Post(),question,this.options);
  }
  Update(Q_id:number,question:IQuestion){
    return this.http.put(QuestionURLs.GetById_Put_Delete(Q_id),question,this.options);
  }
  Delete(Q_id:number){
    return this.http.delete(QuestionURLs.GetById_Put_Delete(Q_id),this.options);
  }
}
