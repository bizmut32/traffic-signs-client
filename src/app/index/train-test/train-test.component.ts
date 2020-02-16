import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { ServerService } from 'src/app/services/server.service';
import { ClassificationResult, EvaluationResult, ClassifiedImage } from 'src/app/model/classification-result.model';
import { Evaluater } from 'src/app/model/evaluater.model';
import { animation } from 'src/app/components/animations';

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
  constructor(private server: ServerService) { }

  ngOnInit() {
  }

  uploadImage() {
    this.startLoading();
    this.scrollToClassification();

    this.server.uploadImage()
    .then(result => { this.showEvaluation(result); })
    .finally(() => { this.stopLoading(); });
  }

  randomImage() {
    this.startLoading();
    this.scrollToClassification();

    this.server.uploadImage()
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

    // this.classificationSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  showEvaluation(classification: ClassificationResult) {
    const evaluation = Evaluater.evaluateClassification(classification);
    this.evaluation = evaluation;

    this.data = this.evaluation.accuracy.map ( value => (value - 0.5) * 95 * 2 );

    this.image = classification.image.base64;
  }
}
