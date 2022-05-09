import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../../user/user.service";
import {concat} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {IUser} from "../../user/user.model";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  id: number | undefined;
  profilePic: any;
  user: IUser | undefined;

  constructor(
    protected authService: AuthService,
    protected jwtHelper: JwtHelperService,
    protected userService: UserService,
    protected _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    this.id = token.userId;
    this.userService.getUser(this.id!).subscribe((res: any) => {
      this.user = res.body;
    });
    this.userService.getImageUser(this.id!).subscribe((res: any) => {
      this.profilePic = 'data:image/jpg;base64,' + res.body.data;
    })
  }

  checkLogin(): boolean {
    return this.authService.isLogged();
  }
}
