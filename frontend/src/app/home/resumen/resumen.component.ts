import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
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
  public pieChartLabels: Label[] = ['Done', 'In-Progress', 'To-Do'];
  public pieChartData: SingleDataSet = [1,1,1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = []; 
  
  public colours = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
  panelId: any = '';
  todo2:any="";
  done:any="";
  inprogress:any="";

  constructor(
    private _taskService: TaskService,
    private _activatedRoute: ActivatedRoute
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.panelId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.panelId);
    this._taskService.reporte(this.panelId).subscribe((res: any) => {
      this.pieChartData = [];
      this.pieChartData.push(res.done, res.inprogress, res.todo);
    });
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

}