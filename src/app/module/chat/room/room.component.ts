import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { IRoom, IRoom_Get, IUser_OfRoom, IUser_OfRoom_Get } from 'src/app/core/interface/api-body.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, AfterViewInit {

  constructor(private roomService: RoomService,
    private storageService: StorageService) {

    this.roomService.chooseRoom$.subscribe(data => {
      this.selectRoom = data;
    });

    this.roomService.updateVirtualRoom$.subscribe(room => {
      if (!this.rooms)
        return;
      let index = this.rooms?.findIndex(r => r.id == this.selectRoom?.id);
      this.rooms[index] = room;
      this.selectRoom = room;
      this.roomService.currentRoom = room;
    });

    this.roomService.addRoom$.subscribe(data => {
      if (!this.rooms)
        this.rooms = [];
      this.rooms.unshift(data);
    });

    this.roomService.expandLeftSide$.subscribe(data => {
      this.isLeftSideExpand = data;
      if (this.isMobile) {
        if (this.isLeftSideExpand)
          this.roomContent.nativeElement.classList.remove('mobile-display');
        else
          this.roomContent.nativeElement.classList.add('mobile-display');
      }
    });
    
  }

  @ViewChild('roomContent') roomContent!: ElementRef;
  @ViewChild('roomDiv') roomDiv!: ElementRef;

  ngAfterViewInit(): void {
    if (this.isMobile) {
      this.roomContent.nativeElement.classList.add('mobile-display');
      this.roomDiv.nativeElement.style.height = this.roomDiv.nativeElement.offsetWidth + 'px';
    }
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 576;

    this.roomService
      .getRoomsOfUser$(this.storageService.getUserInfo().id)
      .subscribe(res => {
        this.rooms = res.body.map((r: IRoom_Get): IRoom => {
          return {
            id: r.id,
            name: this.handleNameOfRoom(r),
            category: r.category,
            isVirtual: false,
            users: r.users.map((u: IUser_OfRoom_Get): IUser_OfRoom => {
              return {
                id: u.id,
                userName: u.userName,
                status: u.status
              };
            })
          };
        });
        if (!this.rooms) {
          this.rooms = [];
          console.log('error');
          return;
        }
        // auto select first room when first load
        if (this.rooms.length > 0 && !this.selectRoom) {
          this.chooseRoom(this.rooms[0]);
        }
        if (this.selectRoom && !this.rooms.find(r => r.id == this.selectRoom?.id)) {
          this.rooms.push(this.selectRoom);
        }
      });
  }

  rooms?: IRoom[];
  selectRoom?: IRoom;
  isMobile!: boolean;
  isLeftSideExpand!: boolean;

  chooseRoom(room: IRoom): void {
    this.selectRoom = room;
    if (!this.isMobile)
      this.roomService.triggerChooseRoom(this.selectRoom);
    else if (this.isMobile && this.isLeftSideExpand) {
      this.roomService.triggerChooseRoom(this.selectRoom)
      console.log('hiih');
    }
  }

  handleNameOfRoom(room: IRoom_Get): string {
    if (room.category != 1)
      return room.name;
    // room is inbox
    if (room.users)
      return this.storageService.getUserInfo().id == room.users[0].id ? room.users[1].userName : room.users[0].userName;
    return 'undefined';
  }

}
