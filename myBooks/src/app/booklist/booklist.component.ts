import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BooksService } from '../sevice/books.service';
import { Book } from '../models/book.model';

import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    // BrowserAnimationsModule,
    // BrowserModule
  ],
  providers: [BooksService],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {

  bookForm: FormGroup;
  allBooks: Array<Book>;
  isFormSubmitted: boolean = false;

  //table
  loading: boolean = true;

  //dialog box
  visible: boolean = false;
  action: string;


  constructor(private bookService: BooksService, private fb: FormBuilder) {
    this.bookForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      author: new FormControl("", [Validators.required, Validators.minLength(3)]),
      description: new FormControl(""),
      publicationYear: new FormControl("", [Validators.required]),
      isbn: new FormControl("", [Validators.required, Validators.minLength(10)])
    })
  };

  navBook() {
    return {
      'background': 'aqua',
      'height': '80px',
      'font-size': '30px',
      'font-weight': 'bold',
      'color': 'blueviolet'
    }
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((res: any) => {
      console.log(res, 'res');
      this.allBooks = res.books;
      this.loading = false;
      console.log(this.allBooks, 'this.books')
    })
  }

  clear(table: Table) {
    table.clear();
  }

  showDialog(action: string, bookValue: Book) {
    this.visible = true;
    this.action = action;
    if (action == 'update') {
      this.bookForm = new FormGroup({
        title: new FormControl(bookValue.title, [Validators.required]),
        author: new FormControl(bookValue.author, [Validators.required, Validators.minLength(3)]),
        description: new FormControl(bookValue.description),
        publicationYear: new FormControl(bookValue.publicationYear, [Validators.required]),
        isbn: new FormControl(bookValue.isbn, [Validators.required, Validators.minLength(10)])
      })
    }
    if (action == 'add') {
      this.bookForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        author: new FormControl("", [Validators.required, Validators.minLength(3)]),
        description: new FormControl(""),
        publicationYear: new FormControl("", [Validators.required]),
        isbn: new FormControl("", [Validators.required, Validators.minLength(10)])
      })
    }
  }

  deleteProduct(book: Book) {
    console.log(book, 'delete book');
    this.bookService.removeBook(book.isbn).subscribe(res => {
      console.log(res);
    })
    this.getAllBooks();
  }

  onSubmit() {
    const isFormValid = this.bookForm.valid;
    this.isFormSubmitted = true;
    console.log(this.bookForm.value);
    if (isFormValid) {
      if (this.action == 'add') {
        this.bookService.createBook(this.bookForm.value).subscribe(res => {
          console.log(res);
        })
      }else {
        this.bookService.updateBook(this.bookForm.value).subscribe(res => {
          console.log(res);
        })
      }
      this.getAllBooks();
    }
  }

}
