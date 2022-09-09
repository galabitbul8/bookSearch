import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  username: string = "";
  books$!: Observable<Book[]>;
  pagingBook$!: Observable<Book[]>;
  pageEvent!: PageEvent;
  length: number = 0;
  previousValue: string = "";
  showNoResult: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private bookService: GoogleBooksApiService, private dialogService: DialogService, private router: Router) { }

  ngOnInit(): void {
    const username = localStorage.getItem('bookApp-username');
    if (username) {
      this.username = username;
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  searchBook(target: any): void {
    const value = target.value.replace(/\s+/g, " ").trim();
    if (value == this.previousValue.trim()) {
      return;
    }
    if (value.length > 0) {
      this.books$ = this.bookService.getListBySearch(value).pipe(tap(books => {
        this.length = books.length;
        this.showNoResult = books.length == 0;
      }));
      this.pagingBook$ = this.books$.pipe(map((book: Book[]) => {
        if (this.paginator) {
          const pageIndex = this.paginator.pageIndex;
          const pageSize = this.paginator.pageSize;
          return book.slice(pageIndex * pageSize, pageSize * (pageIndex + 1));
        } else {
          return book.slice(0, 10);
        }
      }));
      this.previousValue = value;
    } else {
      this.pagingBook$ = of([]);
      this.length = 0;
      this.showNoResult = false;
    }
  }

  onPageChange(event: PageEvent): PageEvent {
    this.pagingBook$ = this.books$.pipe(map((book: Book[]) => {
      const pageIndex = this.paginator.pageIndex;
      const pageSize = this.paginator.pageSize;
      return book.slice(pageIndex * pageSize, pageSize * (pageIndex + 1));
    }));
    return event;
  }

  openDialog(book: Book): void {
    this.bookService.getDetailsById(book.id).subscribe((data: Book) => {
      this.dialogService.openDialog(data);
    })
  }
}
