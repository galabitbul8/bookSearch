import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { DialogData } from 'src/app/models/dialogData';
import { DialogService } from 'src/app/services/dialog.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogService: DialogService, private localStorageService: LocalStorageService, private snackBar: MatSnackBar) { }
  wishlist: Book[] = [];
  wishlist$: Observable<Book[]> = new Observable;
  isToAdd: boolean = true;
  book!: Book;
  rating: string = "";
  fullStarArray: number[] = [];
  halfStarArray: number[] = [];
  blankStarArray: number[] = [];

  ngOnInit(): void {
    const localWishlist: string | null = localStorage.getItem("wishlist");
    this.wishlist$ = this.localStorageService.wishlist$;
    this.book = this.data.book;
    // Check if the book exist in the wishlist
    this.wishlist = localWishlist != null ? JSON.parse(localWishlist) : [];
    if (this.wishlist.find((book) => book.id == this.book.id)) {
      this.isToAdd = false
    }
    this.calculateRating();
  }

  calculateRating() {
    let numFullStar: number = Math.floor(this.book.volumeInfo.averageRating);
    let numHalfStar: number = Math.ceil(this.book.volumeInfo.averageRating) - this.book.volumeInfo.averageRating == 0.5 ? 1 : 0;
    for (let i = 0; i < 5; i++) {
      if (numFullStar > 0) {
        this.fullStarArray.push(0);
        numFullStar--;
      } else if (numHalfStar > 0) {
        this.halfStarArray.push(0);
        numHalfStar--;
      } else {
        this.blankStarArray.push(0);
      }
    }
  }

  changeWishlist(book: Book): void {
    this.localStorageService.wishlist$.subscribe(data => {
      if (data.indexOf(book) == -1 && this.isToAdd) {
        data.push(book);
        this.isToAdd = false;
        this.snackBar.open("Succesed to add book to wish-list");
      } else if (!this.isToAdd) {
        data = data.filter((exsistBook) => exsistBook.id != book.id)
        this.isToAdd = true;
        this.snackBar.open("Succesed to remove book from wish-list");
      }
      localStorage.setItem("wishlist", JSON.stringify(data));
      this.localStorageService.refreshWishList();
      this.dialogService.dialog.closeAll()
    })
  }
}
