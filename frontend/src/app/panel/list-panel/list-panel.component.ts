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
    this.panelData = [];
  }

  ngOnInit(): void {
    this._projectService.listProjectUserP().subscribe(
      (res) => {
        this.panelData = res.project;
        // this.panelData.push({
        //   panelId: {
        //     name: '',
        //     description: 'Crear Nuevo Tablero'
        //   }
        // });
        console.log(this.panelData);
        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
        // this.panelData.push({
        //   panelId: {
        //     name: 'Texto 1',
        //     description: 'Texto 2'
        //   }
        // });
      }
    );
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
