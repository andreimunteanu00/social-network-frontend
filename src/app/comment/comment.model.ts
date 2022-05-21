export interface IComment {
  id: number;
  createDate: Date;
  timeCreatedString: string;
  likeCount: number;
  alreadyLiked: boolean;
  text: boolean;
}

export class Comment implements IComment {
  constructor(
    public id: number,
    public createDate: Date,
    public timeCreatedString: string,
    public likeCount: number,
    public alreadyLiked: boolean,
    public text: boolean
  ) { }
}
