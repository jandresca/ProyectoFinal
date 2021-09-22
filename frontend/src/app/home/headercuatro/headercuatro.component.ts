import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-headercuatro',
  templateUrl: './headercuatro.component.html',
  styleUrls: ['./headercuatro.component.css'],
})
export class HeadercuatroComponent implements OnInit {
  panelData: any;
  panelId:any='';
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.panelData = [];
  }

  ngOnInit(): void {
    this.panelId = this._activatedRoute.snapshot.paramMap.get('id');
    // this.panelData =  this.panelData._id;
    console.log(this.panelId);
  }

  
}
