import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'wishlist', component: WishListComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
