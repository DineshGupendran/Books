import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  apiHost = 'http://localhost:8080'

  constructor(private _http: HttpClient) { }

  createBook(data: Book){
    console.log(data);
    return this._http.post(this.apiHost + '/api/books/createbook', data);
  }

  getAllBooks(){
    console.log('getall books');
    return this._http.get(this.apiHost + '/api/books/getallbooks');
  }

  updateBook(data: Book){
    console.log(data);
    return this._http.put(this.apiHost + `/api/books/${data.isbn}`, data);
  }

  removeBook(isbn: number){
    console.log('isbn', isbn);
    return this._http.delete(this.apiHost + `/api/books/removebook/${isbn}`);
  }
}
