import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/core/interface/api-body.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService) {
    this.roomService.updateMessageList$.subscribe(data => this.rooms = data);
  }

  ngOnInit(): void {
    this.roomService.getRoomsOfUser('61ddf9ce1e1a20d6219517a8').subscribe(data => this.rooms = data.body);
  }

  rooms: any[] = [];

}
