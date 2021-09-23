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
  panelId: any = '';
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _panelService: PanelService,
    private _router: Router
  ) {
    this.panelData = [];
  }

  ngOnInit(): void {
    this.panelId = this._activatedRoute.snapshot.paramMap.get('id');
    // this.panelData =  this.panelData._id;

    if (this.panelId != null || this.panelId != '') {
      this._panelService.listPanel2(this.panelId).subscribe(
        (res) => {
          this.panelData = res.panel;
        },
        (err) => {
          this.message = err.error;
          //this.openSnackBarError();
        }
      );
    } else {
      this._router.navigate(['/listPanel']);
    }

    console.log(this.panelId);
  }
}
