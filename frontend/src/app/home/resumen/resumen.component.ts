import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from "../../services/panel.service";

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
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['PHP', '.Net', 'Java'];
  public pieChartData: SingleDataSet = [50, 30, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  panelId: any = '';
  todo: number;
  inprogress: number;
  done: number;
  list: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _taskService: TaskService
  ) {
    this.todo = 0;
    this.inprogress = 0;
    this.done = 0;
    this.list = 0;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.panelId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.panelId);
    this._taskService.reporte(this.panelId).subscribe(
      (res) => {
        this.todo = res.todo;
        this.inprogress = res.inprogress;
        this.done = res.done;        
        this.list = res.list;
      },
    )
  }
}