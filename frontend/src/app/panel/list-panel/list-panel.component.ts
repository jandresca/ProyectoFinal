import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { ProjectService } from '../../services/project.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css'],
})
export class ListPanelComponent implements OnInit {
  panelData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _panelService: PanelService,
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.panelData = {};
  }

  ngOnInit(): void {
    this._projectService.listProjectUserP().subscribe(
      (res) => {
        this.panelData = res.project;
      },
      (err) => {
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
