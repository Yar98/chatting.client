import { Injectable, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { io } from 'socket.io-client';

import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { API_URLS } from '../constants/api-urls.const';
import { IMessage, IMessage_Create, IMessage_Get, IRoom, IRoom_Get } from '../interface/api-body.interface';
import { StorageService } from './storage.service';
import { RoomService } from './room.service';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private addMessage: ReplaySubject<IMessage> = new ReplaySubject<IMessage>(1);
  public addMessage$: Observable<IMessage> = this.addMessage.asObservable();

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private socketioService: SocketioService) {

    this.socketioService.socket.on('connect', () => {
      this.socketioService.socket.emit('id',
        JSON.stringify({
          id: storageService.getUserInfo().id,
          socketId: this.socketioService.socket.id
        }));
    });

    this.socketioService.socket.on('message', (message: IMessage_Get) => {
      let result: IMessage = {
        id: message.id,
        content: message.content,
        replyMessage: message.replyMessage,
        user: message.user
      }
      this.addMessage.next(result);
    });

    
  }

  triggerAddMessage(message: string, roomId: string) {
    const bodyApi: IMessage_Create = {
      content: message,
      replyMessageId: null,
      roomId: roomId,
      userId: this.storageService.getUserInfo().id,
      socketId: this.socketioService.socket.id
    };
    let data!: IMessage;
    let url = environment.MESSAGE_API + API_URLS.POST_MESSAGE;
    this.httpService.post(url, bodyApi).subscribe(res => {
      data = {
        id: res.body.id,
        content: res.body.content,
        replyMessage: res.body.replyMessage,
        user: res.body.user
      };
      this.addMessage.next(data);
    });
  }

  getMessages$(roomId: string): Observable<any> {
    if (roomId === '') {
      console.log('getmessage roomId null');
      return new Observable<any>();
    }
    const url = environment.MESSAGE_API + API_URLS.GET_MESSAGES_OF_ROOM + '/' + roomId;
    let result = this.httpService.get(url);
    return result;
  }
}
