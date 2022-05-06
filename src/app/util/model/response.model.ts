export interface IResponse {
  response: string;
}

export class Response implements IResponse {
  constructor(
    public response: string
  ) {}
}
