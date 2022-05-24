import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class RoomComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

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
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(): void {
    if (this.message?.length === 0) {
      return;
    }
    this.webSocketService.sendMessage({
      message: this.message,
      sender: this.username,
      room: this.roomId
    });
    this.message = "";
  }

  updateMessage(data:any) {
    this.output.push(data);
    this.chatService.getById(this.roomId!).subscribe((res: any) => {
      if(!data) return;
      const message = new Message();
      message.message = data.message;
      message.chat = res.body;
      message.sender = data.sender;
      this.chatService.save(message).subscribe();
    });
  }

}
