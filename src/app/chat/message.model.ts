import * as dayjs from 'dayjs';
import {IChat} from "./chat.model";

export interface IMessage {
  id?: number;
  createTs?: dayjs.Dayjs
  message?: string;
  sender?: string;
  chat?: IChat;
}

export class Message implements IMessage {
  constructor(
    public id?: number,
    public createTs?: dayjs.Dayjs,
    public message?: string,
    public sender?: string,
    public chat?: IChat
  ) {}

}
