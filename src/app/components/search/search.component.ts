import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable,of,tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username:string = "";
  books$!:Observable<Book[]>;
  pagingBook$!:Observable<Book[]>;
  pageEvent!: PageEvent;
  length:number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bookService:GoogleBooksApiService, private dialogService:DialogService ,private router: Router) { }
  
  ngOnInit(): void {
    const username = localStorage.getItem('bookApp-username');
    if(username){
      this.username = username;
    }else{
      this.router.navigate(['/welcome']);
    }
  }

  searchBook(target:any):void{
    if(target.value.length > 0){
      this.books$ = this.bookService.getListBySearch(target.value).pipe(tap(books =>{
        this.length = books.length;
      }));
      this.pagingBook$ = this.books$.pipe(map((book:Book[])=>{
        if(this.paginator){
          const pageIndex = this.paginator.pageIndex;
          const pageSize = this.paginator.pageSize;
          return book.slice(pageIndex*pageSize,pageSize*(pageIndex+1));
        }else{
          return book.slice(0,10);
        }
    }));
    }else{
      this.pagingBook$ = of([]);
      this.length=0;
    }
  }

  onPageChange(event:PageEvent):PageEvent{
      this.pagingBook$ = this.books$.pipe(map((book:Book[])=>{
        const pageIndex = this.paginator.pageIndex;
        const pageSize = this.paginator.pageSize;
        return book.slice(pageIndex*pageSize,pageSize*(pageIndex+1));
      }));
      return event;
    }


  openDialog(book:Book):void {
    console.log(book);
    this.dialogService.openDialog(book);
  }


}
