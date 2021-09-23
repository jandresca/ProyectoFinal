import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  panelData: any;
  panel:any={};
  nameUser: any = localStorage.getItem('user');
  constructor(
    private _activatedRoute: ActivatedRoute,
    public _userService: UserService,
    public _panelService: PanelService,
  ) { 
    this.panelData = [];
  }

  ngOnInit(): void {
    this.panel._id = this._activatedRoute.snapshot.paramMap.get('id');
    // this.panelData =  this.panelData._id;
    
    this.nameUser = localStorage.getItem('user');
    this.GetData(this.panel._id);
  }


  GetData( id: any ) {
    this._panelService.findPanel(id).subscribe(
      (res) => {
        console.log(res);
        this.panel= res.panel;
      },
      (err) => {
        
      }
    );
  }

}

