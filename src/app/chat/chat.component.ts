import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {IChat} from "./chat.model";
import {IUser} from "../user/user.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: IChat[] | undefined;
  newUsersToChat: IUser[] | undefined;

  constructor(
    protected userService: UserService,
    protected modalService: NgbModal,
    protected route: Router
  ) {}

  ngOnInit(): void {
    this.userService.getChats().subscribe((res: any) => {
      this.chats = res.body;
    })
  }


  getNewChats(chatModal: any) {
    this.userService.getNewChats().subscribe((res: any) => {
      this.newUsersToChat = res.body;
      this.openModal(chatModal)
    })
  }

  openModal(modalContent: any): void {
    this.modalService.open(modalContent, {
      animation: true,
      scrollable: true,
      centered: true,
      size: 'sm'
    });
  }

  createNewChat(id: number) {
    this.userService.createChat(id).subscribe();
    location.reload();
  }
}
