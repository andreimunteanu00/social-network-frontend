export interface IPost {
  id: number;
  title: string;
  createDate: Date;
  timeCreatedString: string;
  likeCount: number;
  alreadyLiked: boolean;
  commentIsHidden: boolean;
  bodyText?: string;
}

export class Post implements IPost {
  constructor(
    public id: number,
    public title: string,
    public createDate: Date,
    public timeCreatedString: string,
    public likeCount: number,
    public alreadyLiked: boolean,
    public commentIsHidden: boolean,
    public bodyText?: string,
  ) { }
}
