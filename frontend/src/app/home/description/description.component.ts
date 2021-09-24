import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from "src/app/services/role.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  panelData: any;
  panel:any={};
  nameUser: any = localStorage.getItem('user');
  message: string = '';
  registerData: any;
  registerData2: any;
  selectedFile: any;
  taskData: any;
  _id: string;
  project: any;
  role:any;
  constructor(
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    public _userService: UserService,
    public _panelService: PanelService,
    public _roleService: RoleService,
  ) { 
    this._id = '';
    this.panelData = [];
    this.project = {};
    this.role = {};
  }

  ngOnInit(): void {
    this.panel._id = this._activatedRoute.snapshot.paramMap.get('id');
    // this.panelData =  this.panelData._id;
    
    this.nameUser = localStorage.getItem('user');
    this.GetData(this.panel._id);
    this.GetUser(this.panel._id);
    this.GetRole();
    
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

  GetUser(id:any) {
    this._projectService.listProjectUser(id).subscribe(
      (res) => {
        console.log(res);
        this.project= res.project;
      },
      (err) => {
        
      }
    )
  }

  GetRole(){
    this._roleService.listRole().subscribe(
      (res) => {
        console.log(res);
        this.role= res.role;
      },
      (err) => {
        
      }
    )
  }

}

