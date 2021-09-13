import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Router } from '@angular/router';
import { ProjectService } from "../../services/project.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface State {
  url: string;
  name: string;
}

@Component({
  selector: 'app-save-panel',
  templateUrl: './save-panel.component.html',
  styleUrls: ['./save-panel.component.css'],
})
export class SavePanelComponent implements OnInit {
  registerData: any;
  selectedFile: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'photo-1',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      url: '../../../assets/img/photo-1.jpg'
    },
    {
      name: 'photo-2',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      url: '../../../assets/img/photo-2.jpg'
    },
    {
      name: 'photo-3',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      url: '../../../assets/img/photo-3.jpg'
    },
    {
      name: 'photo-4',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      url: '../../../assets/img/photo-4.jpg'
    }
  ];

  constructor(
    private _panelService: PanelService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.selectedFile = null;
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {}

  registerPanel() {
    if (
      !this.registerData.name ||
      !this.registerData.description ||
      !this.registerData.theme
    ) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._panelService.registerPanel(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/saveProyect']);
          this.message = 'Panel create';
          this.registerData = {};
        },
        (err) => {
          this.message = err.console.error;
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