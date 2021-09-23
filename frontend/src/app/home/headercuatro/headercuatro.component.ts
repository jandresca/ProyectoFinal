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
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-headercuatro',
  templateUrl: './headercuatro.component.html',
  styleUrls: ['./headercuatro.component.css'],
  
})
export class HeadercuatroComponent implements OnInit {
  panelData: any;
  panel: any = '';
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  nameUser: any = localStorage.getItem('user');

  constructor(
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    public _userService: UserService,
    public _panelService: PanelService,

  ) {
    this.panelData = [];
  }

  ngOnInit(): void {
    this.panel = this._activatedRoute.snapshot.paramMap.get('id');
    // this.panelData =  this.panelData._id;
    // console.log(this.panel);
    
    
    this.nameUser = localStorage.getItem('user');
    this.GetData(this.panel);
  }

  GetData( id: any ) {
    this._panelService.findPanel(id).subscribe(
      (res) => {
        // console.log(res);
        this.panelData= res.panel;
      },
      (err) => {
        
      }
    );

  }
}


