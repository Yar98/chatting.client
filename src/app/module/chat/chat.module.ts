import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { RoomComponent } from './room/room.component';
import { MessageComponent } from './message/message.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    ChatComponent,
    RoomComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
