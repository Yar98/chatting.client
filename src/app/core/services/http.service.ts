import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlService = '';
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any>{
    const newUrl = this.urlService + url;
    return this.http.get(newUrl, {observe: 'response'});
  }

  getBlob(url: string): Observable<any>{
    const newUrl = this.urlService + url;
    return this.http.get(newUrl, {responseType: 'blob'});
  }

  post(url: string, body: Object): Observable<any>{
    const newUrl = this.urlService + url;
    return this.http.post(newUrl, body, {observe: 'response'});
  }

  put(url: string, body: Object): Observable<any>{
    const newUrl = this.urlService + url;
    return this.http.put(newUrl, body, {observe: 'response'});
  }

  delete(url: string): Observable<any>{
    const newUrl = this.urlService + url;
    return this.http.delete(newUrl, {observe: 'response'});
  }
}
