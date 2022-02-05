import { Injectable, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { HttpService } from './http.service';

import { environment } from 'src/environments/environment';
import { API_URLS } from '../constants/api-urls.const';
import { IRoom, IRoom_Create, IRoom_Get } from '../interface/api-body.interface';
import { StorageService } from './storage.service';
import { MessageService } from './message.service';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private chooseRoom: ReplaySubject<IRoom> = new ReplaySubject<IRoom>(1);
  public chooseRoom$: Observable<IRoom> = this.chooseRoom.asObservable();

  private updateVirtualRoom: ReplaySubject<IRoom> = new ReplaySubject<IRoom>(1);
  public updateVirtualRoom$: Observable<IRoom> = this.updateVirtualRoom.asObservable();

  private addRoom: ReplaySubject<IRoom> = new ReplaySubject<IRoom>(1);
  public addRoom$: Observable<IRoom> = this.addRoom.asObservable();

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private socketioService: SocketioService) {
      
      this.socketioService.socket.on('room', (room: IRoom_Get) => {
        console.log(room);
        let result: IRoom = {
          id: room.id,
          name: room.name,
          category: room.category,
          isVirtual: false,
          users: room.users
        }
        this.triggerAddRoom(result);
      });
  }

  getRoomsOfUser$(id: string): Observable<any> {
    const url = environment.MESSAGE_API + API_URLS.GET_ROOMS_OF_USER + '/' + id;
    const rooms = this.httpService.get(url);
    return rooms;
  }

  getRoomInboxOfUser$(userId: string, category: Number): Observable<any> {
    const url = environment.MESSAGE_API + API_URLS.GET_ROOM_INBOX_OF_USER + '/' + category + '?ids=' + userId + ',' + this.storageService.getUserInfo().id;
    return this.httpService.get(url);
  }

  createRoom$(room: IRoom): Observable<any> {
    const url = environment.MESSAGE_API + API_URLS.POST_ROOM;
    const apiBody: IRoom_Create = {
      name: room.name,
      category: room.category,
      socketId: this.socketioService.socket.id,
      users: room.users.map(u => {
        return {
          id: u.id,
          userName: u.userName,
          status: u.status
        }
      })
    }
    return this.httpService.post(url, apiBody)
  }

  triggerChooseRoom(room: IRoom): void {
    this.chooseRoom.next(room);
  }

  triggerUpdateVirtualRoom(room: IRoom): void {
    this.updateVirtualRoom.next(room);
  }

  triggerAddRoom(room: IRoom): void {
    this.addRoom.next(room);
  }
}
