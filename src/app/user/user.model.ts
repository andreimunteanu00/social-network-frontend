import {IGroup} from "../util/model/group.model";

export interface IUser {
  id?: number;
  username?: string | null;
  email?: string | null;
  university?: string | null;
  password?: string | null;
  role?: string | null;
  groups?: IGroup[] | null;
  moderatedGroups?: IGroup[] | null;
  profilePic?: FormData | null;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string | null,
    public email?: string | null,
    public university?: string | null,
    public password?: string | null,
    public role?: string | null,
    public groups?: IGroup[] | null,
    public moderatedGroups?: IGroup[] | null,
    public profilePic?: FormData | null
  ) {}
}
