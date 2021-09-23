import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  Colors,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  todo: any = [];
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
      this.todo.push(res.done);
      this.todo.push(res.inprogress);
      this.todo.push(res.todo);

      this.done=(res.done);
      this.inprogress=(res.inprogress);
      this.todo2=(res.todo);

      console.log(this.todo);

      console.log(this.done,this.inprogress,this.todo2);
      
      
    });
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Done', 'In-Progress', 'To-Do'];
  public pieChartData: SingleDataSet = [this.todo];
  public pieChartType: ChartType = 'pie';
  // public pieColor: Colors='#72C02C';
  public pieChartLegend = true;
  public pieChartPlugins = []; 
  // public Colores: Color= ['#72C02C', '#3498DB', '#717984'];





}




