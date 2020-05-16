import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ImageDetection, Detection } from 'src/app/model/common-interface';
import { animation } from 'src/app/components/animations';

interface StampedObject extends Detection {
  image: string;
  timeStamp: number;
}

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  animations: [ animation() ]
})
export class PhotoComponentComponent implements OnInit, OnDestroy {
  readonly zoomFactor = 1.5;
  @ViewChild('photoCanvas') photoCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('cameraView') cameraView: ElementRef<HTMLVideoElement>;

  detections: StampedObject[] = [];
  running: boolean = false;

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.initializeCamera();
  }

  initializeCamera() {
    const constraints = { video: { facingMode: 'environment' }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      this.cameraView.nativeElement.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Oops. Something is broken.', error);
    });
  }

  takePhoto() {
    return new Promise(async resolve => {
      const { videoWidth: w, videoHeight: h } = this.cameraView.nativeElement;
      this.photoCanvas.nativeElement.width = w;
      this.photoCanvas.nativeElement.height = h;
      const ctx = this.photoCanvas.nativeElement.getContext('2d');
      ctx.drawImage(this.cameraView.nativeElement, 0, 0, w, h);
      ctx.scale(-1, 1);
      await this.manageDetection();
      return resolve();
    });
  }

  manageDetection() {
    return new Promise(async resolve => {
      const imageBase64 = this.photoCanvas.nativeElement.toDataURL();
      const detection = await this.server.classifyImage(imageBase64);
      this.detections.push(...detection.objects.map (object => {
        return { ...object, image: detection.image.base64, timeStamp: Date.now() };
      }));
      resolve();
    });
  }

  async startDetections() {
    while (this.running) {
      await this.takePhoto();
      this.detections = this.detections.filter(object => Date.now() - object.timeStamp < 3000);
      console.log(this.detections);
    }
  }

  toggleDetections() {
    if (this.running) this.running = false;
    else {
      this.running = true;
      this.startDetections();
    }
  }

  ngOnDestroy() {
    this.running = false;
  }
}
