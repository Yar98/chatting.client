import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {  } from '../interface/api-body.interface';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { API_URLS } from 'src/app/core/constants/api-urls.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private searchUser: ReplaySubject<string> = new ReplaySubject<string>(1);
  public searchUser$: Observable<string> = this.searchUser.asObservable();

  constructor(private httpService: HttpService) {
  }

  triggerSearchUser(text: string): void {
    this.searchUser.next(text);
  }

  getFilterUsers$(text: string): Observable<any> {
    const url = environment.USER_API + API_URLS.GET_FILTER_USER + '?name=' + text;
    return this.httpService.get(url);
  }
}
