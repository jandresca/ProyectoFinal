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
import Swal from 'sweetalert2';

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
    if (
      !this.registerData.name ||
      !this.registerData.description ||
      !this.registerData.priority ||
      !this.registerData.finalDate
    ) {
      this.message = 'Failed process: Incomplete data';
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text: this.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
      this.registerData = {};
    } else {
      Swal.fire({
        allowOutsideClick: false,
        text: this.message,
        icon: 'info',
      });
      Swal.showLoading();

      this._taskService.updateTaskImg(this.registerData).subscribe(
        (res:any) => {
          this._router.navigate(['listTask/', this.registerData.panelId]);
          this.message = 'Successfull user registration';
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            title: 'congratulations!',
            text: this.message,
            icon: 'success',
            confirmButtonText: 'Close',
          });

        this.registerData = {};
        },
        (err:any) => {
          this.message = err.error;
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error!',
            text: this.message,
            icon: 'error',
            confirmButtonText: 'Close',
          });
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
