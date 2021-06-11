import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MoviesListService } from 'src/app/@core/services/movies-list.service';
import { NotificationService } from 'src/app/@core/services/notification.service';

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.scss']
})
export class MovieDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, title: string },
    private dialogRef: MatDialogRef<MovieDeleteComponent>,
    private notificationService: NotificationService,
    private moviesListService: MoviesListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  deleteMovie() {
    this.moviesListService.deleteMovie(this.data.id).subscribe(() => {
      this.notificationService.showSuccess(`${this.data.title} filmi silinmiştir.`, 'Başarılı');
      window.location.reload();
    })
  }

}
