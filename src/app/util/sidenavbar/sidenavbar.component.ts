import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  id: number | undefined;
  profilePic: any;

  constructor(
    protected authService: AuthService,
    protected jwtHelper: JwtHelperService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    this.id = token.userId;
    this.userService.getImageUser(this.id!).subscribe((res: any) => {
      console.log(res);
    })
  }

  checkLogin(): boolean {
    return this.authService.isLogged();
  }

}
