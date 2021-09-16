import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user2',
  templateUrl: './update-user2.component.html',
  styleUrls: ['./update-user2.component.css'],
})
export class UpdateUser2Component implements OnInit {
  registerData: any;
  roles: Array<any>;
  message: string = '';
  _id: string;
  newPass: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _Arouter: ActivatedRoute
  ) {
    this.registerData = {};
    this._id = '';
    this.newPass = '';
    this.roles = [];
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['_id'];
      this._userService.findUser(this._id).subscribe(
        (res) => {
          this.registerData = res.users;
          this.registerData.password = this.newPass;
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
    });
  }
  updateUser() {
    if (!this.registerData.name || !this.registerData.email) {
      this.message = 'Failed process: Incomplete data';
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text: this.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else {
      this._userService.updateUser2(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/myProfile']);
          this.message = 'Successfull edit user';
          Swal.fire({
            allowOutsideClick: false,
            title: 'Success!',
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
}
