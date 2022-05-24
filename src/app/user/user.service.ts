import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IUser} from "./user.model";
import * as dayjs from "dayjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  resourceUrl = 'http://localhost:8080/api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  getUser(id: number) {
    return this.http.get(this.resourceUrl + "/" + id, { observe: 'response' })
      .pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  save(user: IUser) {
    const copy = this.convertDateFromClient(user);
    return this.http.patch(this.resourceUrl + "/" + user.id!, user, { observe: 'response' })
      .pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  getImageUser(id: number) {
    return this.http.get(this.resourceUrl + "/image/" + id, { observe: 'response' });
  }

  checkModerator(id: number) {
    return this.http.get(this.resourceUrl + "/" + id + "/checkModerator", { observe: "response" });
  }

  getChats() {
    return this.http.get(this.resourceUrl + "/chats", { observe: "response" });
  }

  getNewChats() {
    return this.http.get(this.resourceUrl + "/newChats", { observe: "response" });
  }

  createChat(id: number) {
    return this.http.get(this.resourceUrl + "/" + id + "/createChat", { observe: "response" });
  }

  getFeed(lastIndex: number) {
    return this.http.get(this.resourceUrl + "/feed/" + lastIndex, { observe: "response" });
  }

  protected convertDateFromClient(user: IUser) {
    return Object.assign({}, user, {
      birthDate: user.birthDate ? JSON.stringify(user.birthDate) : undefined,
    });
  }

  protected convertDateFromServer(res: any) {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? dayjs(res.body.birthDate).format('YYYY-MM-DD') : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: any) {
    if (res.body) {
      res.body.forEach((user: IUser) => {
        user.birthDate = user.birthDate ? dayjs(user.birthDate) : undefined;
      });
    }
    return res;
  }
}
