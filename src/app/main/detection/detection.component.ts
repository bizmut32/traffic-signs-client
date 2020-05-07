import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Detection } from 'src/app/model/common-interface';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {

  @Input() image: string;
  @Input() detection: Detection;
  @ViewChild('imageCanvas') canvas: ElementRef<HTMLCanvasElement>;

  w: number; h: number;

  constructor() { }

  ngOnInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    const { topLeft: { x, y }, bottomRight: { x: x2, y: y2 }} = this.detection.boundingBox;
    const w = x2 - x, h = y2 - y;
    this.w = w, this.h = h;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;

    const image = new Image();
    image.onload = function() {
      ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
    };
    image.src = this.image;
  }
}
