import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MaterialModule } from './modules/material/material.module';
import { BookComponent } from './components/book/book.component';
import { BookDetailsDialogComponent } from './components/book-details-dialog/book-details-dialog.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BookComponent,
    BookDetailsDialogComponent,
    WishListComponent,
    NavComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
