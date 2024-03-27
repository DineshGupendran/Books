import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooklistComponent } from "./booklist/booklist.component";
import { BooksService } from './sevice/books.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      BooklistComponent
    ],
    providers: [BooksService]
})
export class AppComponent {
  title = 'myBooks';
}
