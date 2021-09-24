import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  public barChartLabels: Label[] = ['Done', 'In-Progress', 'To-Do'];
  // public barChartData: SingleDataSet = [1,1,1];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = []; 
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: SingleDataSet = [1,1,1];
  barChartPlugins = [];

  public pieChartLabels: Label[] = ['Done', 'In-Progress', 'To-Do'];
  public pieChartData: SingleDataSet = [1,1,1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = []; 
  
  panelId: any = '';
  todo2:any="";
  done:any="";
  inprogress:any="";
  todo1: number;
  inprogress1: number;
  done1: number;
  list1: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _taskService: TaskService
  ) {
    this.todo1 = 0;
    this.inprogress1 = 0;
    this.done1 = 0;
    this.list1 = 0;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.panelId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.panelId);
    this._taskService.reporte(this.panelId).subscribe((res: any) => {
      this.todo1 = res.todo;
      this.inprogress1 = res.inprogress;
      this.done1 = res.done;        
      this.list1 = res.list;
      this.pieChartData = [];
      this.pieChartData.push(res.done, res.inprogress, res.todo);
      this.barChartData = [];
      this.barChartData.push(res.done, res.inprogress, res.todo);
    });
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

}
