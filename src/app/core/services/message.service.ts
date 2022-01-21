import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { API_URLS } from '../constants/api-urls.const';
import { IMessage } from '../interface/api-body.interface';
import { MESSAGES } from '../mock/mock-messages';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private addMessageList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public addMessageList$: Observable<any> = this.addMessageList.asObservable();

  constructor(private httpService: HttpService) {
    this.httpService.urlService = environment.MESSAGE_API;
    this.socket.on('message', (message) => {
      console.log(message);
      this.addMessageList.next(message);
    })
    this.socket.emit('id', '61ddf9de1e1a20d6219517ab');
  }

  socket = io('http://localhost:3001');


  addMessage(message: any) {
    const bodyApi = {
      content: message,
      replyMessageId: null,
      roomId: '61ddfa2366869da6659d7e6d',
      userId: '61ddf9de1e1a20d6219517ab',
      socketId: this.socket.id
    };
    let data: any = null;
    this.httpService.post(API_URLS.POST_MESSAGE, bodyApi).subscribe(res => {
      data = res.body;
      this.addMessageList.next(data);
    });
  }

  getMessages(): Observable<IMessage[]> {
    const result = of(MESSAGES);
    return result;
  }
}
