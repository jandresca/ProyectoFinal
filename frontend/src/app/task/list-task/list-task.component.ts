import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PanelService } from '../../services/panel.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  todo: any = [];
  progress: any = [];
  done: any = [];

  priorityone: string = 'priorityone';
  prioritytwo: string = 'prioritytwo';
  prioritythree: string = 'prioritythree';

  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _panelService: PanelService,
    public dialog: MatDialog
  ) {
    this.taskData = {};
    this.panelData = {};
  }

  ngOnInit(): void {
    this.loadTask();
  }
  /*
  loadTask() {

    this.done = [];
    this.todo = [];
    this.progress = [];
    this._taskService.getTask().subscribe(
      (res: any) => {
        this.taskData = res.task;
        console.log(res);
        this.taskData.forEach((element: any) => {
          if (element.taskStatus === 'done') this.done.push(element);
          if (element.taskStatus === 'to-do') this.todo.push(element);
          if (element.taskStatus === 'in-progress') this.progress.push(element);
        });
      },
      (error: any) => {
        console.log(error);

      }
    );
  }
  */
  
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }
  loadTask() {
    let panelId = this._activatedRoute.snapshot.paramMap.get('id');
    // console.log(panelId);

    this.done = [];
    this.todo = [];
    this.progress = [];

    if (panelId != null || panelId != '') {
      this._panelService.listPanel2(panelId).subscribe(
        (res) => {
          this.panelData = res.panel;
          console.log(this.panelData);
        },
        (err) => {
          this.message = err.error;
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error!',
            text: this.message,
            icon: 'error',
            confirmButtonText: 'Close',
          });
          //this.openSnackBarError();
        }
      );

      this._taskService.listTask(panelId).subscribe(
        (res: any) => {
          this.taskData = res.task;
          // console.log(res);
          this.taskData.forEach((element: any) => {
            if (element.taskStatus === 'done') this.done.push(element);
            if (element.taskStatus === 'to-do') this.todo.push(element);
            if (element.taskStatus === 'in-progress')
              this.progress.push(element);
          });
        },
        (err: any) => {
          this.message = err.error;
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error!',
            text: this.message,
            icon: 'error',
            confirmButtonText: 'Close',
          });
        }
      );
    } else {
      this._router.navigate(['/listPanel']);
    }
  }

  updateTask(task: any, status: string, button?: string) {
    let tempStatus = task.taskStatus;
    task.taskStatus = status;
    this._taskService.updateTask(task).subscribe(
      (res: any) => {
        task.status = status;
        // if(button) this.loadTask();
        this.loadTask();
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
      (res: any) => {
        let index = this.taskData.indexOf(task);
        if (index > -1) {
          this.taskData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err: any) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }
  drop(event: CdkDragDrop<string[]>, status?: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTask(event.container.data[event.currentIndex], status);
  }
  /*
      deleteTask(task: any) {
        this._taskService.deleteTask(task).subscribe(
          (res) => {
            let index = this.taskData.indexOf(task);
            if (index > -1) {
              this.taskData.splice(index, 1);
              this.message = res.message;
              Swal.fire({
                allowOutsideClick: false,
                title: 'Good',
                text: this.message,
                icon: 'success',
                confirmButtonText: 'Close',
              });
            }
          },
          (err) => {
            this.message = err.error;
            Swal.fire({
              allowOutsideClick: false,
              title: 'Error!',
              text: this.message,
              icon: 'error',
              confirmButtonText: 'Close',
            });
          }
        );
      }
    
      drop(event: CdkDragDrop<string[]>, status?: any) {
        if (event.previousContainer === event.container) {
          moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
        this.updateTask(event.container.data[event.currentIndex], status);
      }
    */
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
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
