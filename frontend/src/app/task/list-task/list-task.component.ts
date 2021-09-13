import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PanelService } from '../../services/panel.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  panelData: any;
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  todo : any = [];
  progress : any = [];
  done : any = [];

  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _panelService: PanelService,
  ) {
    this.taskData = {};
    this.panelData = {};
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask() {
    
    let panelId = this._activatedRoute.snapshot.paramMap.get('id');
    // console.log(panelId);

    this.done = [];
    this.todo = [];
    this.progress = [];

    if (panelId != null || panelId != '') {
      this._panelService.listPanel2(panelId).subscribe(
        (res)=>{
          this.panelData=res.panel;
          console.log(this.panelData);
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      )



      this._taskService.listTask(panelId).subscribe(
        (res: any) => {
          this.taskData=res.task;
        // console.log(res);
        this.taskData.forEach((element: any) => {
          if(element.taskStatus === 'done') this.done.push(element);
          if(element.taskStatus === 'to-do') this.todo.push(element);
          if(element.taskStatus === 'in-progress') this.progress.push(element);
        });
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    } else{
      this._router.navigate(['/listPanel']);
    }

  }
  updateTask(task: any, status: string, button?: string) {
    let tempStatus = task.taskStatus;
    task.taskStatus = status;
    this._taskService.updateTask(task).subscribe(
      (res: any) => {
        task.status = status;
        if(button) this.loadTask();
      },
      (err: any) => {
        task.status = tempStatus;
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deleteTask(task: any) {
    this._taskService.deleteTask(task).subscribe(
      (res) => {
        let index = this.taskData.indexOf(task);
        if (index > -1) {
          this.taskData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }



  drop(event: CdkDragDrop<string[]>, status?: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateTask(event.container.data[event.currentIndex], status);
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
