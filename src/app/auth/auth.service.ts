import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, first, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import * as jwt_decode from "jwt-decode";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IUser} from "../util/model/user.mode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  resourceUrl = 'http://localhost:8080/api/auth';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  login(user: IUser) {
    return this.http.post(this.resourceUrl + "/login", user, { observe: "response" })
      .pipe(
        // @ts-ignore
        first(),
        tap((res: any) => {
          this.isUserLoggedIn$.next(true);
          localStorage.setItem("token", res.body.token);
          this.router.navigate(["post"]);
        })
      );
  }

  register(user: IUser) {
    return this.http.post(this.resourceUrl + "/register", user, { observe: "response" });
  }

  hasRole(role: string): boolean {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    return token.role === role;
  }

}
