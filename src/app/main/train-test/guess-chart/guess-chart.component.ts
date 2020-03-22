import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

export interface GuessChartData {
  data: number[];
  selectedRow: number;
}
@Component({
  selector: 'app-guess-chart',
  template: `<canvas #chart></canvas>`,
  styleUrls: ['./guess-chart.component.css']
})
export class GuessChartComponent implements OnInit {

  @ViewChild('chart') chartElement: ElementRef<HTMLCanvasElement>;

  private _data: GuessChartData = { data: [], selectedRow: -1 };
  @Input() set data(value: GuessChartData) {
    this._data = value;
    this.initializeChart();
  }
  get data() { return this._data; }

  chart: Chart;
  constructor() { }

  ngOnInit() {
    this.chart = new Chart(this.chartElement.nativeElement.getContext('2d'), this.chartData());
    this.initializeChart();
  }

  initializeChart() {
    if (this.chart === undefined) return;
    this.chart.data.datasets.forEach(ds => {
      ds.data = this.data.data;
      ds.backgroundColor = this.getBackgroundColors();
      ds.borderColor = this.getBorderColors();
    });
    this.chart.update();
  }

  chartData() {
    const labels = [];
    for (let i = 0; i < 44; ++i)
      labels.push(i);
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Certainty',
          data: this.data.data,
          backgroundColor: this.getBackgroundColors(43, this.data.selectedRow, 'rgba(255, 99, 132, 0.2)'),
          borderColor: this.getBorderColors(43, this.data.selectedRow, 'rgba(255, 99, 132, 1)'),
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

  getBackgroundColors(
    numberOfBars: number = 43, numberOfColoredBar: number = this.data.selectedRow, color: string = 'rgba(255, 99, 132, 0.2)'
    ) {
    const result = new Array(numberOfBars).fill('rgba(0, 0, 0, 0.1)');
    if (numberOfColoredBar !== -1)
      result[numberOfColoredBar] = color;
    return result;
  }

  getBorderColors(
    numberOfBars: number = 43, numberOfColoredBar: number = this.data.selectedRow, color: string = 'rgba(255, 99, 132, 0.7)'
    ) {
    const result = new Array(numberOfBars).fill('rgba(0, 0, 0, 0.5)');
    if (numberOfColoredBar !== -1)
      result[numberOfColoredBar] = color;
    return result;
  }
}
