import {Injectable} from "@angular/core";
import {io, Socket} from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  typing(data: any): void {
    this.socket.emit('typing', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getTyping(): Observable<any> {
    return new Observable<{ username: string, roomId: string }>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

}
