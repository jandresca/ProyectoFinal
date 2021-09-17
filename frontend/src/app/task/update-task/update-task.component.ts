import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  registerData: any;
  _id: string = '';
  selectedFile: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _Arouter: ActivatedRoute
  ) {
    this.registerData = {};
    this.selectedFile = null;
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['id'];
      this._taskService.findTask(this._id).subscribe(
        (res) => {
          this.registerData = res.task;
          // console.log(this.registerData);
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  transform(value: any) {
    var datePipe = new DatePipe('en-US');
    var fecha = new Date(value);
    var dias = 1; // Número de días a agregar
    value = datePipe.transform(
      fecha.setDate(fecha.getDate() + dias),
      'yyyy-MM-dd'
    );
    return value;
  }

  updateTask() {
    if (!this.registerData.name || !this.registerData.description) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      if (this.selectedFile != null) {
        data.append('image', this.selectedFile, this.selectedFile.name);
      }
      data.append('_id', this.registerData._id);
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);
      data.append('priority', this.registerData.priority);
      data.append('finalDate', this.registerData.finalDate);
      
      this._taskService.updatetaskImg(data).subscribe(
        (res) => {
          this._router.navigate(['/listTask']);
          this.message = 'Task update';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
