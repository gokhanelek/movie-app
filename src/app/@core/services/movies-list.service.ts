import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderOptions } from '../constants/keys';
import { Movie, OmdbMovieResponse } from '../models/movie-list';
import { BaseService, HttpClientService } from './base.service';

const Endpoints = {
  Controller: '',
  Movie: '/movies/',
  Movies: '/movies?q={q}&_sort={sort_by}&_order={order_by}',
  MovieSearch: '/movies?q={q}&_sort={sort_by}&_order={order_by}',
  DeleteMovie: '/movies/',
  AddMovie: '/movies/',
  UpdateMovie: '/movies/',
  OmdbMoviesSearch: '/?apikey={apikey}&s={s}'
};

@Injectable({
  providedIn: 'root'
})
export class MoviesListService extends BaseService<any, any> {

  constructor(httpClient: HttpClientService) {
    super(httpClient, Endpoints.Controller);
  }

  getMovie(id: any): Observable<Movie> {

    let movieId = Number(id);

    const fullPath = this.createUrlWithParams(Endpoints.Movie);
    return this.client.get<Movie>(fullPath + movieId);
  }

  getMovies(
    search: string = '',
    sort_by: any = 'id',
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

  updateMovie(id: number, request: Movie): Observable<Movie> {
    const fullPath = this.createUrlWithParams(Endpoints.UpdateMovie);
    return this.client.put<Movie>(fullPath + id, JSON.stringify(request));
  }

  deleteMovie(id: number): Observable<any> {
    const fullPath = this.createUrlWithParams(Endpoints.DeleteMovie);
    return this.client.delete<any>(fullPath + id);
  }

}
