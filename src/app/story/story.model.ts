export interface IStory {
  id: number;
  createDate: Date;
  filename: string;
  timeCreatedString: string;
  userProfilePhoto: string;
  media: string;
}

export class Story implements IStory {
  constructor(
    public id: number,
    public createDate: Date,
    public filename: string,
    public timeCreatedString: string,
    public userProfilePhoto: string,
    public media: string
  ) { }
}
