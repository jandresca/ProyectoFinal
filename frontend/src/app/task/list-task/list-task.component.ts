import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PanelService } from '../../services/panel.service';
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
  registerData: any;
  panelData: any;
  selectedFile: any;
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  todo: any = [];
  progress: any = [];
  done: any = [];
  _id: string;


  priorityone: string = 'priorityone';
  prioritytwo: string = 'prioritytwo';
  prioritythree: string = 'prioritythree';
  data: {};
  exampleModal: any;

  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _panelService: PanelService,
    
    
  ) {
    this.taskData = {};
    this.data = {};
    this.panelData = {};
    this.registerData = {};
    this._id = '';
    this.selectedFile = null;
     
  }

  ngOnInit(): void {
    this.loadTask();
    this._id = this.panelData._id;
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
              // console.log(this.panelData);
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
      
    updateTask(task: any, status: string, button ?: string) {
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
          this.loadTask();
        },
        (err: any) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
    drop(event: CdkDragDrop < string[] >, status ?: any) {
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

    uploadImg(event: any) {
      this.selectedFile = <File>event.target.files[0];
    }
  
    saveTaskImg() {
      this._id = this.panelData._id;
      if (
        !this.registerData.name ||
        !this.registerData.description ||
        !this.registerData.priority ||
        !this.registerData.finalDate
      ) {
        this.message = 'Failed process: Incomplete data';
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error!',
          text: this.message,
          icon: 'error',
          confirmButtonText: 'Close',
        });
        this.registerData = {};
      } else {
        Swal.fire({
          allowOutsideClick: false,
          text: this.message,
          icon: 'info',
        });
        Swal.showLoading();
        const data = new FormData();
        if (this.selectedFile != null) {
          data.append('image', this.selectedFile, this.selectedFile.name);
        }
        data.append('name', this.registerData.name);
        data.append('description', this.registerData.description);
        data.append('priority', this.registerData.priority);
        data.append('finalDate', this.registerData.finalDate);
        data.append('panelId', this._id);
        // console.log(data);
        // console.log(this.registerData);
  
        this._taskService.saveTaskImg(data).subscribe(
          (res) => {
            this.loadTask();
            // this.message = 'Successfull user registration';
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              title: 'congratulations!',
              text: this.message,
              icon: 'success',
              confirmButtonText: 'Close',
              
            });
          //document.getElementById('exampleModal').hide();
          this.data = {};
          this.registerData = {};
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
    }
  }