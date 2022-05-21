import {IGroup} from "../group/group.model";
import * as dayjs from "dayjs";

export interface IUser {
  id?: number;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: dayjs.Dayjs | null;
  email?: string | null;
  university?: string | null;
  password?: string | null;
  role?: string | null;
  groups?: IGroup[] | null;
  moderatedGroups?: IGroup[] | null;
  profilePic?: FormData | null;
  imageString?: string | null;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public birthDate?: dayjs.Dayjs | null,
    public email?: string | null,
    public university?: string | null,
    public password?: string | null,
    public role?: string | null,
    public groups?: IGroup[] | null,
    public moderatedGroups?: IGroup[] | null,
    public profilePic?: FormData | null ,
    public imageString?: string | null
  ) {}
}
