import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'search',
  component: SearchComponent

},
{
  path: 'list',
  component: ListComponent
},
{
  path: '',
  redirectTo: 'search',
  pathMatch: 'full'
}]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
