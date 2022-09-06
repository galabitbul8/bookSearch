import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksApiService {
  private api_path:string = "https://www.googleapis.com/books/v1/volumes";
  private maxResult:number = 20;
  constructor(private http: HttpClient) { }

  getListBySearch(searchInput:string):Observable<Book[]>{
    return this.http.get<{items:Book[]}>(`${this.api_path}?maxResults=${this.maxResult}&q=${searchInput}`).pipe(map(books => books.items || []));
  }

  getDetailsById(id: string):Observable<Book>{
    return this.http.get<{item:Book}>(`${this.api_path}/${id}`).pipe(map(book => book.item));
  }
}
