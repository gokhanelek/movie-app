import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { SelectItem, SortType } from 'src/app/@core/models/common';
import { Movie } from 'src/app/@core/models/movie-list';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  search: string;
  movies: Movie[];
  pictureSize: string = 'SX200'
  isResponse: boolean = false;
  selectedSort: string = SortType.topRate;
  totalResult: number;
  movieLenght: number = 10;

  constructor(
    private moviesListService: MoviesListService,
  ) { }

  sortList: SelectItem[] = [
    { value: '1', viewValue: SortType.topRate },
    { value: '2', viewValue: SortType.lowestRate },
  ];

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesListService.getMovies().subscribe(res => {
      this.movies = res.slice(0, this.movieLenght)
      this.totalResult = res.length;
      this.movies.forEach(x => {
        x.Poster = x.Poster.replace('SX300', this.pictureSize);
      })
      this.isResponse = true;
    }, err => {
      alert(err.message);
      this.isResponse = false;
    });
  }

  changeSearch() {
    if (this.search === undefined || this.search === null || this.search.length === 0) {
      this.getMovies();
      return;
    };

    this.moviesListService.getSearchMovies(this.search).subscribe(res => {
      this.movies = res.slice(0, this.movieLenght);
      this.totalResult = res.length;
      this.movies.forEach(x => {
        x.Poster = x.Poster.replace('SX300', this.pictureSize);
      })
      this.isResponse = true;
    }, err => {
      alert(err.message);
      this.isResponse = false;
    });
  }

  changeSorting(e) {
    console.log(e);
  }

  getMoreMovies() {
    this.movieLenght = this.movieLenght + 10;
    this.getMovies();
  }

}
