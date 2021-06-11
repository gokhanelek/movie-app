import { Component, OnInit } from '@angular/core';
import { OrderOptions } from 'src/app/@core/constants/keys';
import { SelectItem, SortType } from 'src/app/@core/models/common';
import { Movie } from 'src/app/@core/models/movie-list';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDeleteComponent } from '../movie-delete/movie-delete.component';


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
  selectedSort: any = SortType.topRate;
  totalResult: number;
  movieLenght: number = 10;
  sort_by: string = '';
  order_by = OrderOptions.Desc;

  constructor(
    private moviesListService: MoviesListService,
    private dialog: MatDialog,
  ) { }

  sortList: SelectItem[] = [
    { value: SortType.topRate, viewValue: 'En yüksek puanlı' },
    { value: SortType.lowestRate, viewValue: 'En düşük puanlı' },
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
    this.moviesListService.getMovies(this.search).subscribe(res => {
      this.totalResult = res.length;

      if (this.totalResult === 0) {
        this.isResponse = false;
        return;
      }

      this.movies = res.slice(0, this.movieLenght);
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
    this.sort_by = 'rate';
    e === 1 ? this.order_by = OrderOptions.Desc : this.order_by = OrderOptions.Asc;

    this.moviesListService.getMovies(this.search, this.sort_by, this.order_by).subscribe(res => {
      this.movies = res.slice(0, this.movieLenght);
      this.movies.forEach(x => {
        x.Poster = x.Poster.replace('SX300', this.pictureSize);
      })
      this.isResponse = true;
    }, err => {
      alert(err.message);
      this.isResponse = false;
    });
  }

  getMoreMovies() {
    this.movieLenght = this.movieLenght + 10;
    this.getMovies();
  }

  openDialog(id: number, title: string): void {
    const dialogRef = this.dialog.open(MovieDeleteComponent, {
      width: 'auto', disableClose: true, data: { id: id, title: title },
    });
  }

}

