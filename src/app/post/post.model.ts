import {Comment} from '../comment/comment.model';

export interface IPost {
  id: number;
  title: string;
  createDate: Date;
  timeCreatedString: string;
  likeCount: number;
  alreadyLiked: boolean;
  commentIsHidden: boolean;
  comments: Comment[],
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
    public comments: Comment[],
    public bodyText?: string,
  ) { }
}
