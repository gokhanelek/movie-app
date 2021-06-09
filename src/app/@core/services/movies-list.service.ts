import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie-list';
import { BaseService, HttpClientService } from './base.service';

const Endpoints = {
  Controller: '',
  Movies: '/movies',
  MovieSearch: '/movies?Title={s}',
};

@Injectable({
  providedIn: 'root'
})
export class MoviesListService extends BaseService<any, any> {

  constructor(httpClient: HttpClientService) {
    super(httpClient, Endpoints.Controller);
  }

  getMovies(): Observable<Movie[]> {
    const fullPath = this.createUrlWithParams(Endpoints.Movies);
    return this.client.get<Movie[]>(fullPath);
  }

  getSearchMovies(search: string): Observable<Movie[]> {
    let json = {
      s: search
    }
    const fullPath = this.createUrlWithParams(Endpoints.MovieSearch, json);
    return this.client.get<Movie[]>(fullPath);
  }
}
