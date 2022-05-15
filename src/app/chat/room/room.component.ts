import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../web-socket.service";
import {UserService} from "../../user/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ActivatedRoute} from "@angular/router";
import {IMessage, Message} from "../message.model";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  title = 'Websocket Angular client ';
  username: string | undefined;
  message: string | undefined;
  output: IMessage[] = [];
  roomId: number | undefined;

  constructor(
    protected webSocketService: WebSocketService,
    protected route: ActivatedRoute,
    protected jwtHelper: JwtHelperService,
    protected chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    this.username = token.username;
    this.chatService.getMessagesFromDb(this.roomId!).subscribe((res: any) => {
      this.output = res.body;
    });
    this.webSocketService.joinRoom(this.roomId);
    this.webSocketService.getMessage().subscribe((data: any) => {
      if (data.room === this.roomId) {
        this.updateMessage(data);
      }
    })
  }

  sendMessage(): void {
    this.webSocketService.sendMessage({
      message: this.message,
      user: this.username,
      room: this.roomId
    });
    this.message = "";
  }

  updateMessage(data:any) {
    this.chatService.getById(this.roomId!).subscribe((res: any) => {
      if(!!!data) return;
      const message = new Message();
      message.message = data.message;
      message.chat = res.body;
      message.sender = this.username;
      this.chatService.save(message).subscribe();
      this.output.push(data);
    });
  }

  ngOnDestroy(): void {
  }

}
