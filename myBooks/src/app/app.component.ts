import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooklistComponent } from "./booklist/booklist.component";
import { BooksService } from './sevice/books.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      BooklistComponent,
      // BrowserModule,
      // BrowserAnimationsModule,
      // CommonModule
    ],
    providers: [BooksService]
})
export class AppComponent {
  title = 'myBooks';
}
