import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderOptions } from '../constants/keys';
import { Movie, OmdbMovieResponse } from '../models/movie-list';
import { BaseService, HttpClientService } from './base.service';

const Endpoints = {
  Controller: '',
  Movie: '/movies?Id={Id}',
  Movies: '/movies?q={q}&_sort={sort_by}&_order={order_by}',
  MovieSearch: '/movies?q={q}&_sort={sort_by}&_order={order_by}',
  DeleteMovie: '/movies',
  AddMovie: '/movies',
  UpdateMovie: '/movies',
  OmdbMoviesSearch: '/?apikey={apikey}&s={s}'
};

@Injectable({
  providedIn: 'root'
})
export class MoviesListService extends BaseService<any, any> {

  constructor(httpClient: HttpClientService) {
    super(httpClient, Endpoints.Controller);
  }

  getMovie(id: string): Observable<Movie> {
    let json = {
      Id: id
    }

    const fullPath = this.createUrlWithParams(Endpoints.Movie, json);
    return this.client.get<Movie>(fullPath);
  }

  getMovies(
    search: string = '',
    sort_by: any = 'Id',
    order_by: string = OrderOptions.Desc,
  ): Observable<Movie[]> {

    let json = {
      q: search,
      sort_by: sort_by,
      order_by: order_by,
    }
    const fullPath = this.createUrlWithParams(Endpoints.Movies, json);
    return this.client.get<Movie[]>(fullPath);
  }

  getOmdbMovies(search: string): Observable<OmdbMovieResponse> {
    let json = {
      s: search,
    }

    const fullPath = this.createOmdbUrlWithParams(Endpoints.OmdbMoviesSearch, json);
    return this.client.get<OmdbMovieResponse>(fullPath);
  }

  addMovie(request: Movie): Observable<any> {
    const fullPath = this.createUrlWithParams(Endpoints.AddMovie);
    return this.client.post<any>(fullPath, JSON.stringify(request));
  }

  updateMovie(request: Movie): Observable<Movie> {
    const fullPath = this.createUrlWithParams(Endpoints.UpdateMovie);
    return this.client.post<any>(fullPath, JSON.stringify(request));
  }

  deleteMovie(id: string): Observable<any> {
    let json = {
      id: id,
    }
    const fullPath = this.createUrlWithParams(Endpoints.DeleteMovie);
    return this.client.delete<any>(fullPath, JSON.stringify(json));
  }

}
