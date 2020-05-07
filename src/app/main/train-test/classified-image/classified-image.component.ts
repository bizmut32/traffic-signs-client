import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ImageDetection } from 'src/app/model/common-interface';

@Component({
  selector: 'app-classified-image',
  templateUrl: './classified-image.component.html',
  styleUrls: [ './classified-image.component.css' ]
})
export class ClassifiedImageComponent implements OnInit {

  detection: ImageDetection;
  image: HTMLImageElement;
  boundingBoxes: { x: number; y: number, w: number; h: number; }[];


  @Input('classification') set _detection(value: ImageDetection | null) {
    this.detection = value;
    if (value !== null)
      this.setNewDetection();
  }

  @ViewChild('classifiedImage') classifiedImage: ElementRef<HTMLCanvasElement>;
  constructor() { }

  ngOnInit() {
  }


  setNewDetection() {
    this.boundingBoxes = this.detection.objects.map(object => {
      const { topLeft: { x, y }, bottomRight: { x: x2, y: y2 } } = object.boundingBox;
      const w = x2 - x, h = y2 - y;
      return { x, y, w, h };
    });
  }
}
