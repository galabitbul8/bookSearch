import { Component, OnInit } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username:string = "";
  books$!:Observable<Book[]>;
  constructor(private bookService:GoogleBooksApiService, private dialogService:DialogService ,private router: Router) { }
  length:number = 0;
  ngOnInit(): void {
    const username = localStorage.getItem('bookApp-username');
    if(username){
      this.username = username;
    }else{
      this.router.navigate(['/welcome']);
    }
  }

  searchBook(target:any):void{
    console.log(target.value);
    if(target.value.length > 0){
      this.books$ = this.bookService.getListBySearch(target.value).pipe(tap(books =>this.length = books.length));
    }
  }

  openDialog(book:Book):void {
    console.log(book);
    this.dialogService.openDialog(book);
  }


}
