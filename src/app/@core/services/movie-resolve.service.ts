import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Movie } from "../models/movie-list";
import { MoviesListService } from "./movies-list.service";

@Injectable({
    providedIn: 'root',
})
export class GetMovieResolveService implements Resolve<Movie> {

    constructor(protected moviesListService: MoviesListService,

    ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Movie> {
        return this.moviesListService.getMovie(route.paramMap.get('id'));
    }
}
