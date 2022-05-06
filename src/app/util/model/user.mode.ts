import {IGroup} from "./group.model";

export interface IUser {
  id: number;
  username: string;
  email: string;
  university: string;
  password: string;
  role: string;
  groups: IGroup[];
  moderatedGroups: IGroup[];
}

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public university: string,
    public password: string,
    public role: string,
    public groups: IGroup[],
    public moderatedGroups: IGroup[]
  ) {}
}
