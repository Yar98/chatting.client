import { Component, OnDestroy, OnInit } from '@angular/core';

import { IMessage, IMessage_Get, IUser } from 'src/app/core/interface/api-body.interface';
import { MessageService } from 'src/app/core/services/message.service';
import { RoomService } from 'src/app/core/services/room.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  constructor(private messageService: MessageService,
    private roomService: RoomService,
    private storageService: StorageService) {

    this.messageService.addMessage$.subscribe(data => {
      if(!this.messages)
        this.messages = [];
      this.messages.unshift(data);
    });

    this.roomService.chooseRoom$.subscribe(data => {
      if (data.isVirtual)
        return;
      this.messageService
        .getMessages$(data.id)
        .subscribe(res => this.messages = res.body.map(function (mess: IMessage_Get): IMessage {
          return {
            id: mess.id,
            content: mess.content,
            replyMessage: mess.replyMessage,
            user: {
              id: mess.user.id,
              userName: mess.user.userName,
              status: mess.user.status
            }
          };
        }));
    });

  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.user = this.storageService.getUserInfo();

    
  }

  user?: IUser;
  messages?: IMessage[];

}
