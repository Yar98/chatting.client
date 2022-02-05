import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IUser_Get, IRoom_Get, IRoom, IUser } from 'src/app/core/interface/api-body.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private userService: UserService,
    private roomService: RoomService,
    private storageService:StorageService) {

  }

  ngOnInit(): void {
    this.userService.searchUser$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((text: string) => this.userService.getFilterUsers$(text))
      )
      .subscribe(res => this.users = res.body.map((u: any): IUser_Get => {
        return {
          id: u.id,
          userName: u.userName
        }
      }));
  }

  users!: IUser[];

  chooseUser(user: IUser): void {
    this.roomService.getRoomInboxOfUser$(user.id, 1).subscribe(data => {
      let room!: IRoom;
      let name = this.handleNameOfRoom(data.body);
      // room not exist
      if (!data || Object.keys(data.body).length == 0)
        room = {
          id: Date.now().toString(),
          name: user.userName,
          category: 1,
          isVirtual: true,
          users: [
            {
              id: this.storageService.getUserInfo().id,
              userName: this.storageService.getUserInfo().userName,
              status: 1
            },
            {
              id: user.id,
              userName: user.userName,
              status: 1
            }
          ]
        };
      else // room existed
        room = {
          id: data.body.id,
          name: name,
          category: data.body.category,
          isVirtual: false,
          users: data.body.users
        };
      this.roomService.triggerChooseRoom(room);
    })
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
