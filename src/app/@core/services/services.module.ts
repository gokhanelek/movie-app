import { NgModule } from '@angular/core';
import { BaseService, HttpClientService } from './base.service';
import { MoviesListService } from './movies-list.service';

@NgModule({
  providers:[
    BaseService,
    HttpClientService,
    MoviesListService,
  ]
})
export class ServicesModule { }
