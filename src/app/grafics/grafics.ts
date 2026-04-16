import {Component, OnInit} from '@angular/core';
import {Chart, ChartType} from 'chart.js/auto';
import {Capcelera} from '../capcelera/capcelera';
@Component({
  selector: 'app-grafics',
  imports: [
    Capcelera
  ],
  templateUrl: './grafics.html',
  styleUrl: './grafics.css',
})
export class Grafics implements OnInit{

  // @ts-ignore
  public chart: Chart;

  ngOnInit(): void {

    const data = {
      labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40, 43, 83, 51, 25, 68],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart("chart", {
      type: 'line' as ChartType,
      data
    })
  }


}
