import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMessage} from "./message.model";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  resourceUrl = 'http://localhost:8080/api/chat';

  constructor(protected http: HttpClient) {}

  save(messages: IMessage) {
    return this.http.post(this.resourceUrl, messages, { observe: "response" });
  }

  getById(roomId: number) {
    return this.http.get(this.resourceUrl + "/" + roomId, { observe: "response" });
  }

  getMessagesFromDb(roomId: number) {
    return this.http.get(this.resourceUrl + "/messages/" + roomId, { observe: "response" })
  }
}
