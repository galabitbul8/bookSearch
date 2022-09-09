import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookSearch';

  isUserIn(): boolean {
    if (window.location.pathname == '/search' || window.location.pathname == '/wishlist') {
      return true;
    }
    return false;
  }
}
