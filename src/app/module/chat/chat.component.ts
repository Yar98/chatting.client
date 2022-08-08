import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { IRoom, IRoom_Get } from 'src/app/core/interface/api-body.interface';
import { MessageService } from 'src/app/core/services/message.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { LeftSideDirective } from './left-side.directive';
import { RoomComponent } from './room/room.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  constructor(private messageService: MessageService,
    private roomService: RoomService,
    private userService: UserService) {

    roomService.chooseRoom$.subscribe(data => {
      this.room = data;
      if (!this.isRoomComp) {
        const viewContainerRef = this.appLeftSide.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<RoomComponent>(RoomComponent);
        this.searchBox.nativeElement.value = '';
        this.isRoomComp = true;
      }
    });

    this.roomService.expandLeftSide$.subscribe(data => {
      this.isLeftSideExpand = data;
      if (this.isLeftSideExpand && this.isMobile) {
        this.leftSide.nativeElement.classList.add('mobile-width-expand');
        this.leftHeaderContent.nativeElement.classList.remove('mobile-display');
      }
      else if (!this.isLeftSideExpand && this.isMobile) {
        this.leftSide.nativeElement.classList.remove('mobile-width-expand');
        this.leftHeaderContent.nativeElement.classList.add('mobile-display');
      }
    });

  }

  @ViewChild(LeftSideDirective, { static: true }) appLeftSide!: LeftSideDirective;
  @ViewChild('dropdowncontent') dropdowncontent!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;
  @ViewChild('leftSide') leftSide!: ElementRef;
  @ViewChild('leftHeaderContent') leftHeaderContent!: ElementRef;

  ngAfterViewInit(): void {
    const viewContainerRef = this.appLeftSide.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<RoomComponent>(RoomComponent);
    this.isRoomComp = true;

    if (this.isMobile) {
      this.leftSide.nativeElement.classList.remove('w-25');
      this.leftSide.nativeElement.classList.add("mobile-width");
      this.leftHeaderContent.nativeElement.classList.add('mobile-display');
    }
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 576;
  }

  room!: IRoom;
  isRoomComp: boolean = false;
  isMobile: any;
  isLeftSideExpand: boolean = false;

  sendMessage(mess: string): void {
    if (!this.room) {
      console.log('room null');
      return;
    }
    if (this.room.isVirtual) {
      console.log('virtual room');
      this.roomService.createRoom$(this.room).subscribe(res => {
        this.room = res.body;       
        this.roomService.triggerUpdateVirtualRoom(res.body);
        this.messageService.triggerAddMessage(mess, res.body.id);
      });
      return;
    }
    this.messageService.triggerAddMessage(mess, this.room.id);
  }

  searchUser(text: string): void {
    this.loadComponent(text);
    if (text !== null && text !== '') {
      this.userService.triggerSearchUser(text);
    }
  }

  showDropDownContent(): void {
    if (!this.isMobile)
      this.dropdowncontent.nativeElement.classList.toggle("show");
    if (this.isMobile && this.isLeftSideExpand) {
      this.dropdowncontent.nativeElement.classList.toggle("show");
    }
  }

  loadComponent(text?: string): void {
    const viewContainerRef = this.appLeftSide.viewContainerRef;
    if (text !== null && text !== '') {
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<SearchComponent>(SearchComponent);
      this.isRoomComp = false;
    } else {
      console.log('text null');
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<RoomComponent>(RoomComponent);
      this.isRoomComp = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdowncontent.nativeElement.classList.remove("show");
    }
    if (!this.leftSide.nativeElement.contains(event.target)) {

      this.roomService.expandLeftSide$.next(false);
    }
  }

  expandLeft(): void {
    this.roomService.expandLeftSide$.next(true);

  }

}
