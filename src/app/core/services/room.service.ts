import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS } from '../constants/api-urls.const';
import { IRoom } from '../interface/api-body.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private updateMessageList: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);
  public updateMessageList$: Observable<IRoom[]> = this.updateMessageList.asObservable();

  constructor(private httpService: HttpService) { 
    this.httpService.urlService = environment.MESSAGE_API 
  }

  getRoomsOfUser(id: string): Observable<any> {
    const rooms = this.httpService.get(API_URLS.GET_ROOMS_OF_USER + '/' + id);
    return rooms;
  }
}
