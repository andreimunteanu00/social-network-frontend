import {IUser} from "../user/user.model";

export interface IChat {
  id?: number;
  users?: IUser[];
}

export class Chat implements IChat {
  constructor(
    public id?: number,
    public users?: IUser[],
  ) {}

}
