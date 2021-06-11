import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/@core/models/movie-list';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';
import { NotificationService } from 'src/app/@core/services/notification.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {

  movie: Movie;
  form: FormGroup = new FormGroup({});
  isDisabled: boolean = true;
  id: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private moviesListService: MoviesListService,
  ) {
    this.movie = this.activatedRoute.snapshot.data['movieResponse'];
    this.validationForm();
  }

  ngOnInit(): void {
  }

  validationForm() {
    this.form = this.fb.group({
      rate: ([this.movie.rate, [Validators.required, Validators.max(10)]]),
    });
  }

  onSubmit() {
    this.movie.rate = this.form.get('rate').value;
    this.moviesListService.updateMovie(this.movie.id, this.movie).subscribe(() => {
      this.notificationService.showSuccess(`${this.movie.Title} filmi güncellenmiştir.`, 'Başarılı');
    }, err => {
      alert(err.message);
    });
  }

}
