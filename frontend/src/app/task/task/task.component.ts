import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() todo: any = [];
  @Input() progress: any = [];
  @Input() done: any = [];
  priorityone: string = 'priorityone';
  prioritytwo: string = 'prioritytwo';
  prioritythree: string = 'prioritythree';
  @Input() taskData: any =[];
  constructor() { }

  ngOnInit(): void {
  }

  @Input() updateTask(task: any, status: string, button ?: string): void {};
  @Input() deleteTask(task: any): void {};

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
}
