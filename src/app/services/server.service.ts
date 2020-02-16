import { Injectable } from '@angular/core';
import { EvaluationResult, ClassificationResult } from '../model/classification-result.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  static getBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  }

  public uploadImage(): Promise<ClassificationResult> {
    const guesses = [];
    for (let i = 0; i < 43; ++i)
      guesses.push(Math.random() * 0.8);
    guesses[1] = 0.98345;

    return new Promise(async resolve => {
      this.readImageFromProjectFolder('40.jpg')
      .then(async image => {
        setTimeout(() => {
          resolve({image: {base64: image}, guesses, executionTime: 123});
        }, 1500);
      });
    });
  }

  public generateRandomImage(): Promise<ClassificationResult> {
    return this.uploadImage();
  }

  private readImageFromProjectFolder(url: string): Promise<string> {
    return new Promise(resolve => {
      this.http.get('./assets/images/' + url,  {observe: 'response', responseType: 'blob'}).toPromise()
      .then(async (result: HttpResponse<Blob>) => {
        resolve(ServerService.getBase64(result.body));
      });
    });
  }
}
