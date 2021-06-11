import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/@core/models/movie-list';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';
import { NotificationService } from 'src/app/@core/services/notification.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.scss']
})
export class MovieAddComponent implements OnInit {

  movies: Movie[];
  form: FormGroup = new FormGroup({});
  pictureSize: string = 'SX40';
  search: string;
  movie: Movie;
  isDisabled: boolean = true;
  isForm: boolean = false;
  maxId: number;

  constructor(
    private moviesListService: MoviesListService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.validationForm();
    this.getMaxId();
  }

  validationForm() {
    this.form = this.fb.group({
      rate: ['', [Validators.required, Validators.max(10)]]
    })
  }

  getMaxId() {
    this.moviesListService.getMovies().subscribe(x => {
      this.maxId = Math.max.apply(Math, x.map(function (o) { return o.Id; }))
    }, err => {
      alert(err.message);
    });
  }

  changeSearch() {
    this.moviesListService.getOmdbMovies(this.search).subscribe(res => {
      let response = (res.Response.toLocaleLowerCase() === 'true');
      if (!response) {
        return;
      }

      this.movies = res.Search;
      this.movies.forEach(x => {
        x.Poster = x.Poster.replace('SX300', this.pictureSize);
      })
    }, err => {
      alert(err.message);
    });
  }

  updateAddForm(e) {
    let search = e
    this.moviesListService.getOmdbMovies(search).subscribe(res => {
      this.isForm = true;
      res.Search.forEach(x => {
        this.movie = x;
      });
    }, err => {
      alert(err.message);
    });
  }

  onSubmit() {
    this.movie.rate = this.form.get('rate').value;
    this.movie.Id = this.maxId + 1;
    this.notificationService.showSuccess(`${this.movie.Title} filmi eklenmiştir.`, 'Başarılı');
    // this.moviesListService.addMovie(this.movie).subscribe(() => {
    //   this.notificationService.showSuccess(`${this.movie.Title} filmi eklenmiştir.`, 'Başarılı');
    //   this.getMaxId();
    // });
  }

}
