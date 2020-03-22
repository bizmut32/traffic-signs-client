import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

interface Point {
  x: number;
  y: number;
}
class Rectangle {
  from: Point;
  to: Point;

  get width(): number {
    return Math.abs(this.to.x  - this.from.x);
  }

  get height(): number {
    return Math.abs(this.to.y  - this.from.y);
  }

  get center(): Point {
    return { x: (this.from.x + this.to.x) / 2, y: (this.from.y + this.to.y) / 2 };
  }

  get top(): number {
    return Math.min(this.from.y, this.to.y);
  }

  get left(): number {
    return Math.min(this.from.x, this.to.x);
  }
}

interface ImageData {
  image: File;
  signs: Rectangle[];
  width?: number;
  height?: number;
}

interface OutputData {
  name: string;
  w: number;
  h: number;
  signs: {
    x: number;
    y: number;
    w: number;
    h: number;
  } [];
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  images: ImageData[];
  currentImageIndex: number = 0;
  currentRectangle?: Rectangle = null;

  selectedRectangleIndex?: number = null;

  @ViewChild('imageUploadInput') imageUploadInput: ElementRef<HTMLInputElement>;
  @ViewChild('imageDisplay') imageDisplay: ElementRef<HTMLImageElement>;

  constructor(private cd: ChangeDetectorRef) {}

  initImages() {
    const files: FileList = this.imageUploadInput.nativeElement.files;
    this.images = Array.from(files).map<ImageData> (file => ({ image: file, signs: [] }));
    this.currentImageIndex = 0;
    this.displayImage();
  }

  displayImage() {
    return new Promise(resolve => {
      const image = this.images[this.currentImageIndex];
      const reader = new FileReader();
      reader.onload = () => {
        const imageDisplay = this.imageDisplay.nativeElement;
        imageDisplay.src = reader.result.toString();
        imageDisplay.onload = () => {
          image.width = imageDisplay.offsetWidth;
          image.height = imageDisplay.offsetHeight;
          resolve();
        };
      };
      reader.readAsDataURL(image.image);
    });
  }

  startRect(event: MouseEvent) {
    event.preventDefault();
    this.currentRectangle = new Rectangle();
    this.currentRectangle.from = { x: event.offsetX, y: event.offsetY };
    this.currentRectangle.to = { x: event.offsetX, y: event.offsetY };
  }

  drawRect(event: MouseEvent) {
    if (!this.currentRectangle) return;
    this.currentRectangle.to = { x: event.offsetX, y: event.offsetY };
    event.stopPropagation();
  }

  endRect(event: MouseEvent) {
    this.images[this.currentImageIndex].signs.push(this.currentRectangle);
    this.currentRectangle = null;
    event.stopPropagation();
  }

  removeRect(index: number) {
    this.images[this.currentImageIndex].signs.splice(index, 1);
  }

  next() {
    const currentImage = this.images[this.currentImageIndex];
    this.currentImageIndex++;
    if (this.currentImageIndex === this.images.length) {
      alert('You are ready');
      this.currentImageIndex = 0;
    }

    this.displayImage();
  }

  prev() {
    this.currentImageIndex--;
    if (this.currentImageIndex === -1) this.currentImageIndex = this.images.length - 1;
    this.displayImage();
  }

  saveData() {
    if (this.images === null) return;
    const fileContent = JSON.stringify(
      this.images.map(data => this.mapImageData(data)),
      null, 2);
    this.download('generated_data.json', fileContent);
  }

  mapImageData(image: ImageData): OutputData {
    if (!image.width || !image.height)
      alert(`Error downloading ${image.image.name}`);
    return {
      name: image.image.name,
      w: image.width,
      h: image.height,
      signs: image.signs.map(sign => ({
        x: sign.center.x,
        y: sign.center.y,
        w: sign.width,
        h: sign.height
      }))
    };
  }

  download(fileName: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
