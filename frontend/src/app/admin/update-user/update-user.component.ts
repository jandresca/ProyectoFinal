import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
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
    this.roles=[];
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['_id'];
      this._userService.findUser(this._id).subscribe(
        (res) => {
          this.registerData=res.users;
          // console.log(this.registerData);
          this.registerData.password=this.newPass;
          this._roleService.listRole().subscribe(
            (res)=>{
              this.roles=res.role;
              console.log(this.roles);
            },
            (err) => {
              this.message = err.error;
              this.openSnackBarError();
            }
          )
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }
  updateUser(){
    if (
      !this.registerData.name ||
      !this.registerData.email 
    ) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
    } else {
      this._userService.updateUser(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/listUser']);
          this.message = 'Successfull edit user';
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
