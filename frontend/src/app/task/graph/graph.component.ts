import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-script.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {

  constructor(private _CargaScripts: CargarScriptsService) {
    _CargaScripts.Carga(['ejemplo/ejemplo']);
  }

  ngOnInit(): void {}
}
