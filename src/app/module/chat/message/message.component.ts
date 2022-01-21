import { Component, OnInit } from '@angular/core';
import { IMessage } from 'src/app/core/interface/api-body.interface';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService: MessageService) {
    this.messageService.addMessageList$.subscribe(data => {
      this.messages.push({
        id: data._id,
        content: data.content,
        createdTime: data.createdTime,
        replyMessage: null,
        user: {
          id: '11',
          password: 'ddd',
          userName: 'ddd'
        }
      });
    });
  }

  ngOnInit(): void {
    this.getMessage();
  }

  messages: IMessage[] = [];

  getMessage(): void {
    this.messageService.getMessages().subscribe(messages => this.messages = messages);
  }
}
