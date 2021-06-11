import { NgModule } from '@angular/core';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared.module';
import { MovieDeleteComponent } from './movie-delete/movie-delete.component';



@NgModule({
  declarations: [
    MoviesListComponent,
    MovieAddComponent,
    MovieUpdateComponent,
    MovieDeleteComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
