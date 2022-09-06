import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable,of,tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { DialogData } from 'src/app/models/dialogData';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private bookService:GoogleBooksApiService,private localStorageService: LocalStorageService,private snackBar: MatSnackBar ) { }
  wishlist:Book[] = [];
  wishlist$:Observable<Book[]> = new Observable;
  isToAdd:boolean = true;

  ngOnInit(): void {
    const localWishlist:string | null = localStorage.getItem("wishlist");
    this.wishlist$ = this.localStorageService.wishlist$;
    this.wishlist = localWishlist != null ? JSON.parse(localWishlist) : [];
    if(this.wishlist.find((book)=> book.id == this.data.book.id)){
      this.isToAdd = false
    }
  }

  changeWishlist(book:Book):void{
    this.localStorageService.wishlist$.subscribe(data=>{
      if(data.indexOf(book)== -1 && this.isToAdd){
        data.push(book);
        this.isToAdd = false;
        this.snackBar.open("Succesed to add book");
      }else if(!this.isToAdd){
          data = data.filter((exsistBook) => exsistBook.id != book.id)
          this.isToAdd = true;
          this.snackBar.open("Succesed to remove book");
      }
      localStorage.setItem("wishlist",JSON.stringify(data)); 
      this.localStorageService.refreshWishList();
      })
  }
}
