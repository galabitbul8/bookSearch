import { Injectable } from '@angular/core';
import { BookDetailsDialogComponent } from '../components/book-details-dialog/book-details-dialog.component';
import { Book } from '../models/book';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(book:Book):MatDialogRef<BookDetailsDialogComponent, any>{
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      data: {
        book:book
      },
    });
    return dialogRef;
  }

}
