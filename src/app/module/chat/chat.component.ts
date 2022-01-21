import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage(mess: string): void {
    const message = {
      id: '3',
      content: mess,
      createdTime: new Date(Date.now.toString()),
      replyMessage: null,
      user: {
        id: '3',
        userName: 'yarite',
        password: 'yarite'
      }
    };
    this.messageService.addMessage(mess);
  }

}
