import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartData } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-guess-chart',
  template: `<canvas #chart></canvas>`,
  styleUrls: ['./guess-chart.component.css']
})
export class GuessChartComponent implements OnInit {

  @ViewChild('chart') chartElement: ElementRef<HTMLCanvasElement>;

  private _data: number[] = [];
  @Input() set data(value: number[]) {
    this._data = value;
    this.initializeChart();
  }
  get data() { return this._data; }

  chart: Chart;
  constructor() { }

  ngOnInit() {
    this.chart = new Chart(this.chartElement.nativeElement.getContext('2d'), this.chartData);
    this.initializeChart();
  }

  initializeChart() {
    if (this.chart === undefined) return;
    this.chart.data.datasets.forEach(ds => { ds.data = this._data; });
    this.chart.update();
  }

  get chartData() {
    const labels = [];
    for (let i = 0; i < 44; ++i)
      labels.push(i);
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Certainty',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: -100,
              max: 100,
              beginAtZero: true
            }
          }]
        }
      }
    };
  }
}
