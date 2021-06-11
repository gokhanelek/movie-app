import { NgModule } from '@angular/core';
import { BaseService, HttpClientService } from './base.service';
import { GetMovieResolveService } from './movie-resolve.service';
import { MoviesListService } from './movies-list.service';
import { NotificationService } from './notification.service';

@NgModule({
  providers:[
    BaseService,
    HttpClientService,
    MoviesListService,
    NotificationService,
    GetMovieResolveService,
  ]
})
export class ServicesModule { }
