import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
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
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  displayedColumns: string[] = ['NAME', 'EMAIL', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userData = {};
    this.dataSource = new MatTableDataSource(this.userData);
  }

  ngOnInit(): void {
    this._userService.listUser('').subscribe(
      (res) => {
        this.userData = res.users;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deleteUser(user: any) {
    Swal.fire({
      title: 'You sure want to delete this user?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._userService.deleteUser(user).subscribe(
          (res) => {
            let index = this.userData.indexOf(user);
            if (index > -1) {
              this.userData.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.userData);
              this.message = 'Delete user';
            }
          },
          (err) => {
            this.message = err.error;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.message,
              confirmButtonText: 'Close',
            })
          }
        );
        Swal.fire('Successfully removed', '', 'success')
      }
    })
  }

  updateUser(user: any) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
