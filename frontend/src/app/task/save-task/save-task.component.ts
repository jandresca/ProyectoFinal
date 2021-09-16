import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PanelService } from '../../services/panel.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  registerData: any;
  selectedFile: any;
  message: string = '';
  _id: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _taskService: TaskService,
    private _panelService: PanelService,
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { 
    this.registerData = {};
    this._id = '';
    this.selectedFile = null;
  }

  ngOnInit(): void { 
      this._Arouter.params.subscribe((params) => {
      this._id = params['id'];
    })
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg() {
    if (
      !this.registerData.name ||
      !this.registerData.description ||
      !this.registerData.priority
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
      const data = new FormData();
      if (this.selectedFile != null) {
        data.append('image', this.selectedFile, this.selectedFile.name);
      }
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);
      data.append('priority', this.registerData.priority);
      data.append('panelId', this._id);
      console.log(data);
            console.log(this.registerData);

      this._taskService.saveTaskImg(data).subscribe(
        (res) => {
          this._router.navigate(['listTask/', this._id]);
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
        (err) => {
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
