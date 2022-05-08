import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

  checkLogin(): boolean {
    return this.authService.isLogged();
  }
}
