import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import { Observable } from "rxjs";
import {AuthService} from "../auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (token && !helper.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}
