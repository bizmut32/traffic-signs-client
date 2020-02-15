import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-train-test',
  templateUrl: './train-test.component.2.html',
  styleUrls: ['./train-test.component.css']
})
export class TrainTestComponent implements OnInit {

  data: number[];
  constructor() { }

  ngOnInit() {
  }

}
