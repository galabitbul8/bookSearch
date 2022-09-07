import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/models/book';
import { DialogService } from 'src/app/services/dialog.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private router: Router,private dialogService:DialogService,private localStorageService:LocalStorageService) { }

  wishlist$:Observable<Book[]> = new Observable;

  
  ngOnInit(): void {
    const username = localStorage.getItem('bookApp-username');
    if(!username){
      this.router.navigate(['/welcome']);
    }
    this.wishlist$ = this.localStorageService.wishlist$;
  }
  
  openDialog(book:Book) {
    const dialogRef =this.dialogService.openDialog(book);
    dialogRef.afterClosed().subscribe(()=>{
      this.wishlist$ = this.localStorageService.wishlist$;
    });
  }
}
