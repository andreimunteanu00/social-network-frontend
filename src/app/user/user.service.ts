import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IUser} from "./user.model";

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
    return this.http.get(this.resourceUrl + "/" + id, { observe: 'response' });
  }

  save(user: IUser) {
    return this.http.patch(this.resourceUrl + "/" + user.id!, user, { observe: 'response' });
  }

  getImageUser(id: number) {
    return this.http.get(this.resourceUrl + "/image/" + id, { observe: 'response' });
  }
}
