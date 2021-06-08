import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MoviesListResponse } from '../models/movie-list';
import { BaseService, HttpClientService } from './base.service';

const Endpoints = {
  Controller: '',
  MoviesList: '/?apikey={apikey}&s={s}',
};

@Injectable({
  providedIn: 'root'
})
export class MoviesListService extends BaseService<any, any> {

  constructor(httpClient: HttpClientService) {
    super(httpClient, Endpoints.Controller);
  }

  getMovies(search: string): Observable<MoviesListResponse> {
    let json = {
      s: search
    }

    const fullPath = this.createUrlWithParams(Endpoints.MoviesList, json);
    return this.client.get<MoviesListResponse>(fullPath);
  }
}
