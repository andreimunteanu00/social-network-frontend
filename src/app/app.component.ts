import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-network-frotend';

  constructor(protected authService: AuthService) {}

  checkLogin(): boolean {
    return this.authService.isLogged();
  }
}
