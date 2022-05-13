import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, first, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import * as jwt_decode from "jwt-decode";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IUser} from "../user/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  resourceUrl = 'http://localhost:8080/api/auth';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected jwtHelper: JwtHelperService
  ) {}

  login(user: IUser) {
    return this.http.post(this.resourceUrl + "/login", user, { observe: "response" })
      .pipe(
        first(),
        tap((res: any) => {
          this.isUserLoggedIn$.next(true);
          localStorage.setItem("token", res.body.token);
          this.router.navigate(["/"]);
        })
      );
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  register(user: IUser) {
    return this.http.post(this.resourceUrl + "/register", user, { observe: "response" });
  }

  changepass(email: string, oldPassword: string, newPassword: string) {
    return this.http.post(this.resourceUrl + "/change-password", { email, oldPassword, newPassword }, { observe: "response" });
  }

  hasRole(role: string): boolean {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    return token.role === role;
  }

  isLogged(): boolean {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      return true;
    }
    return false;
  }

}
