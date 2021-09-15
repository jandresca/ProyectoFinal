import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

export interface State {
  url: string;
  name: string;
}

@Component({
  selector: 'app-update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.css'],
})
export class UpdatePanelComponent implements OnInit {
  registerData: any;
  selectedFile: any;
  _id: string = '';
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'photo-1.jpg',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      url: '../../../assets/img/photo-1.jpg',
    },
    {
      name: 'photo-2.jpg',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      url: '../../../assets/img/photo-2.jpg',
    },
    {
      name: 'photo-3.jpg',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      url: '../../../assets/img/photo-3.jpg',
    },
    {
      name: 'photo-4.jpg',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      url: '../../../assets/img/photo-4.jpg',
    },
  ];

  constructor(
    private _panelService: PanelService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _Arouter: ActivatedRoute
  ) {
    this.registerData = {};
    this.selectedFile = null;
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter((state) =>
      state.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['id'];
      // console.log(this._id);
      this._panelService.findPanel(this._id).subscribe(
        (res) => {
          this.registerData = res.panel;
          // console.log(this.registerData);
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }

  updatePanel() {
    if (
      !this.registerData.name ||
      !this.registerData.description ||
      !this.registerData.theme
    ) {
      this.message = 'Failed process: Imcomplete data';
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text: this.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        text: this.message,
        icon: 'info',
      });
      Swal.showLoading();
      this._panelService.updatePanel(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/listPanel']);
          this.message = 'Successfull edit Panel';
          Swal.close();
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
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

  // updatePanel() {
  //   if (
  //     !this.registerData.name ||
  //     !this.registerData.description ||
  //     !this.registerData.theme
  //   ) {
  //     this.message = 'Failed process: Incomplete data';
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       title: 'Error!',
  //       text: this.message,
  //       icon: 'error',
  //       confirmButtonText: 'Close',
  //     });
  //     this.registerData = {};
  //   } else {
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       text: this.message,
  //       icon: 'info',
  //     });
  //     Swal.showLoading();
  //     this._panelService.registerPanel(this.registerData).subscribe(
  //       (res) => {
  //         this._router.navigate(['/saveProyect']);
  //         this.message = 'Panel create';
  //         Swal.close();
  //         this.registerData = {};
  //       },
  //       (err) => {
  //         this.message = err.console.error;
  //         Swal.fire({
  //           allowOutsideClick: false,
  //           title: 'Error!',
  //           text: this.message,
  //           icon: 'error',
  //           confirmButtonText: 'Close',
  //         });
  //       }
  //     );
  //   }
  // }

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
