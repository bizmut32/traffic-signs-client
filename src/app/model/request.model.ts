import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorResponse } from './response.model';

const API = 'http://localhost:8080';

export class Request<ResultType = any> {
  private url: string;
  private method: string;
  private data: string;

  private http: HttpClient;
  private headers: HttpHeaders;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public get(url: string): Promise<ResultType> {
    this.url = url;
    this.method = 'get';
    return new Promise((resolve, reject) => {
      this.http.get<ResultType>(API + url, { headers: this.headers }).subscribe(
        result => {
          resolve(result);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public post(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'post';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.post<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          resolve(result);
        },
        error => {
          console.log(error);
          this.fail(error.error, reject);
        },
      );
    });
  }

  public patch(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'patch';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.patch<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          resolve(result);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public put(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'put';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.put<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          resolve(result);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public delete(url: string): Promise<ResultType> {
    this.url = url;
    this.method = 'delete';
    return new Promise((resolve, reject) => {
      this.http.delete<ResultType>(API + url, { headers: this.headers }).subscribe(
        result => {
          resolve(result);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }


  private fail(result: ErrorResponse, reject) {
    console.log(result);
    console.log(this);

    if (result.message) reject(result.message);
    else reject({ message: 'Request failed' });
  }
}
