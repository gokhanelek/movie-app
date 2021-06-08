import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/@core/models/movie-list';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  search: string = 'matrix';
  movies: Movie[];
  pictureSize: string = 'SX100'

  constructor(
    private moviesListService: MoviesListService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }
  
  getMovies() {
    this.moviesListService.getMovies(this.search).subscribe(res => {
      this.movies = res.Search;
      this.movies.forEach((x, i) => {
        x.Poster = x.Poster.replace('SX300', this.pictureSize);
      })
      console.log(this.movies);
    }, err => {
      alert(err.message);
    });
  }

}
