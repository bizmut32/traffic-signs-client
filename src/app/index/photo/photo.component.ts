import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponentComponent implements OnInit {

  @ViewChild('photoCanvas') photoCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('cameraView') cameraView: ElementRef<HTMLVideoElement>;
  @ViewChild('takenPhoto') takenPhoto: ElementRef<HTMLImageElement>;

  constructor() { }

  ngOnInit() {
    this.initializeCamera();
  }

  initializeCamera() {
    const constraints = { video: { facingMode: 'user' }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      const track = stream.getTracks()[0];
      this.cameraView.nativeElement.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Oops. Something is broken.', error);
    });
  }

  takePhoto() {
    this.photoCanvas.nativeElement.width = this.cameraView.nativeElement.videoWidth;
    this.photoCanvas.nativeElement.height = this.cameraView.nativeElement.videoHeight;
    this.photoCanvas.nativeElement.getContext('2d').drawImage(this.cameraView.nativeElement, 0, 0);
    this.takenPhoto.nativeElement.src = this.photoCanvas.nativeElement.toDataURL('image/webp');
    this.takenPhoto.nativeElement.classList.add('taken');
  }
}
