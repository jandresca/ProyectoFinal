import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent implements OnInit{
  registerData: any;
  registerData2: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  _id: string = '';

  constructor( private _projectService: ProjectService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _Arouter: ActivatedRoute
    ) {
      this.registerData = {};
      this.registerData2 = {};
     }

  ngOnInit(): void {
    
    this._Arouter.params.subscribe((params) => {
      this._id = params['id'];
      this._projectService.listProjectUser(this._id).subscribe(
        (res: any) => {
          this.registerData2 = res.project;
          console.log(this.registerData2)
        },
        (err: any) => {
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
      })

  }

  shareProjectUser() {
    if (
      !this.registerData.email
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
      const data = {
        'panelId':this._id,
        'email':this.registerData.email
      }
      // console.log(data);
      
      this._projectService.shareProjectUser(data).subscribe(
        (res:any) => {
          //this._router.navigate(['/listTask/']);
          this.message = 'Project create';
          Swal.close();
          this.registerData = {};
          this.ngOnInit()
        },
        (err:any) => {
          this.message = err.console.error;
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

  deleteProject(userProject: any) {
    // console.log(userProject);
    this._projectService.deleteUserProject(userProject).subscribe(
      (res: any) => {
        this.message = res.message;
          this.openSnackBarSuccesfull();
          this.ngOnInit();
      },
      (err: any) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
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
