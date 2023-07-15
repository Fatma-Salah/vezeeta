import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewURLs } from 'src/app/Environment/App.Const';
import { IReview } from 'src/app/Interfaces/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }
  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  GetAllByDoctor(Dr_id:number){
    return this.http.get(ReviewURLs.GetByDoctor(Dr_id),this.options);
  }
  GetAllByPatient(patient_id:number){
    return this.http.get(ReviewURLs.GetByPatient(patient_id),this.options);
  }
  GetById(Dr_id:number,patient_id:number){
    return this.http.get(ReviewURLs.GetById_Put_Delete(Dr_id,patient_id),this.options);
  }
  Add(review:IReview){
    return this.http.post(ReviewURLs.Post(),review,this.options);
  }
  Update(Dr_id:number,patient_id:number,review:IReview){
    return this.http.put(ReviewURLs.GetById_Put_Delete(Dr_id,patient_id),review,this.options);
  }
  Delete(Dr_id:number,patient_id:number){
    return this.http.delete(ReviewURLs.GetById_Put_Delete(Dr_id,patient_id),this.options)
  }
}
