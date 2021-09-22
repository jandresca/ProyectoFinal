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
import { TaskService } from 'src/app/services/task.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

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
    private _snackBar: MatSnackBar,
    private _taskService: TaskService,

  ) {
    this.panelData = [];
  }

  ngOnInit(): void {  
    this.loadboard();
  }

  loadboard(): void {
    this._projectService.listProjectUserP().subscribe(
      (res) => {
        this.panelData = res.project;
        this.PanelExample();
        // this.panelData.push({
        //   panelId: {
        //     name: '',
        //     description: 'Crear Nuevo Tablero'
        //   }
        // });
        console.log(this.panelData);
        
      },
      (err) => {
        this.PanelExample();
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

  PanelExample(){
    console.log(this.panelData);
    
    if(this.panelData.length === 0){
      console.log("entro");
      this._panelService.registerPanel({
        name: 'Tablero Introduccionnn',
        description: 'Tablero introduccion usuarios',
        theme: 'photo-1.jpg',
        dbStatus: true,
        panelAlternative: '1',
      }).subscribe(
        (res) => {
          this._projectService.registerProject(res.result).subscribe(
            (project) => { 
             console.log(res);
             this.loadboard();
             this.taskintroduccion(res.result);
            },
            (err) => {
              this.message = err.error;
              this.openSnackBarError();
            }
          );
        });
  
    }
  }

  taskintroduccion(panel?:any){
    const tasks = [
      {
     
      panelId: panel._id,
      name: 'Bienvenido',
      description: 'Bienvenido al tablero de Tooltask, gracias por elegirnos',
      priority: 1,
      taskStatus: 'to-do',
      finalDate: new Date()
      },
      {
      panelId: panel._id,
      name: 'Crea una Tarea!',
      description: 'Para crear una tarea solo tendrás que dar click en crear tarea',
      priority: 1,
      taskStatus: 'to-do',
      finalDate: new Date()
      },
      {
        panelId: panel._id,
        name: 'Informacion Tarea',
        description: 'Cada tarea cuenta con diferentes campos: nombre,descripción,prioridad, y estado',
        priority: 1,
        taskStatus: 'in-progress',
        finalDate: new Date()
      },
      {
        panelId: panel._id,
        name: 'Prioridad',
        description: 'La prioridad se ve reflejada en el color del borde de cada tarjeta de la siguiente manera Alta: Rojo, Normal: Amarillo, Baja:Verde',
        priority: 2,
        taskStatus: 'in-progress',
        finalDate: new Date()
      },
      {
        panelId: panel._id,
        name: 'Estado de la tarea',
        description: 'Cada tarea puede tomar tres diferentes estados: To-do, in-progress, Done',
        priority: 3,
        taskStatus: 'in-progress',
        finalDate: new Date()
      },
      {
        panelId: panel._id,
        name: 'Cambiar estado',
        description: 'Para cambiar el estado de una tarjeta puedes arrastrarlo a la columna que desees o dar click en los botones respectivos',
        priority: 1,
        taskStatus: 'done',
        finalDate: new Date()
      },
      {
        panelId: panel._id,
        name: 'Fecha de la tarea',
        description: 'Cada tarea tiene una fecha final, y respecto al tiempo que quede tomará diferentes valores: en proceso, en riesgo y atrasada',
        priority: 2,
        taskStatus: 'done',
        finalDate: new Date()
      },
    ];    
    this.saveTask(tasks);
  }
  
  saveTask(tasks:any){
    tasks.forEach((task:any) =>{
      this._taskService.saveTaskImg(task).subscribe(
        (res:any)=>{
          console.log("Task", res);
        },
        (err:any)=>{
          console.log("Error task", err);
        }
      );
    })

  }
}
