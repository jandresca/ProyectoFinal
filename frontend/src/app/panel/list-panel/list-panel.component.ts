import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { ProjectService } from '../../services/project.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

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
        console.log(this.panelData);
        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  transform(value: any) {
    var datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd MMMM yyyy');
    return value;
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
