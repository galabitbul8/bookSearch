import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable} from 'rxjs';
import { Book } from 'src/app/models/book';
import { DialogData } from 'src/app/models/dialogData';
import { DialogService } from 'src/app/services/dialog.service';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private bookService:GoogleBooksApiService,private dialogService:DialogService,private localStorageService: LocalStorageService,private snackBar: MatSnackBar ) { }
  wishlist:Book[] = [];
  wishlist$:Observable<Book[]> = new Observable;
  isToAdd:boolean = true;
  book:any;
  ngOnInit(): void {
    const localWishlist:string | null = localStorage.getItem("wishlist");
    this.wishlist$ = this.localStorageService.wishlist$;

    // Check if the book exist in the wishlist
    this.wishlist = localWishlist != null ? JSON.parse(localWishlist) : [];
    if(this.wishlist.find((book)=> book.id == this.data.book.id)){
      this.isToAdd = false
    }

    console.log(this.data.book.id);
    this.bookService.getDetailsById(this.data.book.id).subscribe((data:any)=>{
      console.log(data);
    })

  }

  changeWishlist(book:Book):void{
    this.localStorageService.wishlist$.subscribe(data=>{
      if(data.indexOf(book)== -1 && this.isToAdd){
        data.push(book);
        this.isToAdd = false;
        this.snackBar.open("Succesed to add book to wish-list");
      }else if(!this.isToAdd){
          data = data.filter((exsistBook) => exsistBook.id != book.id)
          this.isToAdd = true;
          this.snackBar.open("Succesed to remove book from wish-list");
      }
      localStorage.setItem("wishlist",JSON.stringify(data)); 
      this.localStorageService.refreshWishList();
      this.dialogService.dialog.closeAll()
      })
  }
}
