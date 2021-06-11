import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/@core/services/notification.service';

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.scss']
})
export class MovieDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MovieDeleteComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  deleteMovie() {
    this.notificationService.showSuccess(`${this.data.name} filmi silinmiştir.`, 'Başarılı');
    this.dialogRef.close();
  }

}
