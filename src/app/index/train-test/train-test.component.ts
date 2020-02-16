import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { ServerService } from 'src/app/services/server.service';
import { Evaluater, EvaluationResult } from 'src/app/model/evaluater.model';
import { animation } from 'src/app/components/animations';
import { ImageConverter } from 'src/app/model/image-converter.model';
import { ClassificationResult } from 'src/app/model/common-interface';

@Component({
  selector: 'app-train-test',
  templateUrl: './train-test.component.2.html',
  styleUrls: ['./train-test.component.css'],
  animations: [animation(500)]
})
export class TrainTestComponent implements OnInit {

  data: number[];
  evaluation: EvaluationResult;
  image: string = 'https://via.placeholder.com/200x200?text=Your+image';

  loading: boolean = false;
  @ViewChild('classification') classificationSection: ElementRef<HTMLElement>;
  @ViewChild('imageUploadInput') imageUploadInput: ElementRef<HTMLInputElement>;

  constructor(private server: ServerService) { }

  ngOnInit() {
  }

  randomImage() {
    this.startLoading();
    this.scrollToClassification();

    this.server.generateRandomImage()
    .then(result => { this.showEvaluation(result); })
    .finally(() => { this.stopLoading(); });
  }

  async uploadImage() {
    this.startLoading();
    this.scrollToClassification();

    const image = this.getImageFromFile();
    this.server.uploadImage(image)
    .then(result => { this.showEvaluation(result); })
    .finally(() => { this.stopLoading(); });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  scrollToClassification() {
    const element = this.classificationSection.nativeElement;
    const offset = 37;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
    });
  }

  showEvaluation(classification: ClassificationResult) {
    const evaluation = Evaluater.evaluateClassification(classification);
    this.evaluation = evaluation;

    this.data = this.evaluation.accuracy.map ( value => (value - 0.5) * 95 * 2 );

    this.image = classification.image.base64;
  }

  getImageFromFile(): File {
    const files: FileList = this.imageUploadInput.nativeElement.files;
    const file: File = files[0];
    return file;
  }
}
