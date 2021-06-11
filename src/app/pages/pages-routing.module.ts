import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { GetMovieResolveService } from '../@core/services/movie-resolve.service';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: 'movies-list',
    component: MoviesListComponent,
  },
  {
    path: 'movie-add',
    component: MovieAddComponent,
  },
  {
    path: 'movie-update/:id',
    component: MovieUpdateComponent,
    resolve: { movieResponse: GetMovieResolveService },
  },
  {
    path: '',
    redirectTo: 'movies-list',
    pathMatch: 'full'
  },
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
