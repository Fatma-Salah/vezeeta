import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchURLs } from 'src/app/Environment/App.Const';
import { ISearch } from './../../Interfaces/i-search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private options = {
    observe: 'response' as const,
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  Search(search: ISearch) {
    return this.http.post(SearchURLs.Get_Post(), search);
  }
}
