import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageConverter } from '../model/image-converter.model';
import { ImageDetection } from '../model/common-interface';
import { Request } from 'src/app/model/request.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  public uploadImage(image: File): Promise<ImageDetection> {
    return new Promise(async (resolve, reject) => {
      const compressedImage = await ImageConverter.compressImage(image);
      const base64Image = await ImageConverter.fileToBase64(compressedImage);
      const result = new Request<ImageDetection>(this.http).post('/image/static', {image: base64Image});
      resolve(result);
    });
  }

  public classifyImage(data: {image: string, lat: number, lon: number}): Promise<ImageDetection> {
    return new Request<ImageDetection>(this.http).post('/image', data);
  }

  public classifyStaticImage(image: string): Promise<ImageDetection> {
      return new Request<ImageDetection>(this.http).post('/image/static', {image});
  }

  public classifyRandomImage(): Promise<ImageDetection> {
    return new Request<ImageDetection>(this.http).post('/image/random');
  }
}
