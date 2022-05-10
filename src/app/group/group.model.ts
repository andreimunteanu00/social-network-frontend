import {IUser} from "../user/user.model";

export interface IGroup {
  id?: number;
  name?: string;
  description?: string;
  users?: IUser[];
  moderators?: IUser[];
  imageString?: string;
}

export class Group implements IGroup {
  constructor(
    public id?: number,
    public description?: string,
    public moderators?: IUser[],
    public name?: string,
    public users?: IUser[],
    public imageString?: string
  ) {}

}
