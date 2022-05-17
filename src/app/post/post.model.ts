export interface IPost {
  id: number;
  title: string;
  createDate: Date;
  timeCreatedString: string;
  likeCount: number;
  alreadyLiked: boolean;
  bodyText?: string;

  findTimeCreatedString(): void;
}

export class Post implements IPost {
  timeCreatedString = "";

  constructor(
    public id: number,
    public title: string,
    public createDate: Date,
    public likeCount: number,
    public alreadyLiked: boolean,
    public bodyText?: string,
  ) { }

  findTimeCreatedString(): void {
    const currentDate = new Date();

    const msBetweenDates = Math.abs(currentDate.getTime() - this.createDate.getTime());

    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 24) {
      this.timeCreatedString = "today";
    }

    this.timeCreatedString = "not today";
  }
}
