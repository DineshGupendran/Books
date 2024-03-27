import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BooksService } from '../sevice/books.service';
import { Book } from '../models/book.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import swal from 'sweetalert';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule
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
      publicationYear: new FormControl(new Date(), [Validators.required]),
      isbn: new FormControl("", [Validators.required, Validators.minLength(10)])
    })
  };

  navBook() {
    return {
      'background': '#3e4571',
      'height': '80px',
      'font-size': '30px',
      'font-weight': 'bold',
      'color': '#9652d5'
    }
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.allBooks = res.books;
      this.loading = false;
    })
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
        publicationYear: new FormControl(new Date().toISOString(), [Validators.required]),
        isbn: new FormControl("", [Validators.required, Validators.minLength(10)])
      })
    }
  }

  async deleteProduct(book: Book) {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      this.bookService.removeBook(book.isbn).subscribe(res => {
        this.loading = true;
        this.getAllBooks();
        swal("Deleted!", "Your book has been deleted!", "success");
      })
    }
  }

  onSubmit() {
    const isFormValid = this.bookForm.valid;
    this.isFormSubmitted = true;
    if (isFormValid) {
      if (this.action == 'add') {
        this.bookService.createBook(this.bookForm.value).subscribe((res: any) => {
          if (!res.stat && res.msg == "isbn exists") {
            swal("Warning", "ISBN already exists!", "warning");
          } else {
            this.visible = false;
            this.loading = true;
            this.getAllBooks();
            swal("Success", "Book was added!", "success");
          }
        })
      } else {
        this.bookService.updateBook(this.bookForm.value).subscribe(res => {
          this.visible = false;
          this.loading = true;
          this.getAllBooks();
            swal("Success", "Book was Updated!", "success");
        })
      }
    }
  }

}
