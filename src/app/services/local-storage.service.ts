import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public wishlist$:Observable<Book[]> = new Observable;

  constructor() { 
    let localWishlist:string | null = localStorage.getItem("wishlist");
    this.wishlist$ = of( localWishlist != null ? JSON.parse(localWishlist) : []);
  }

  refreshWishList():void{
    let localWishlist:string | null = localStorage.getItem("wishlist");
    this.wishlist$ = of( localWishlist != null ? JSON.parse(localWishlist) : []);
  }
}
