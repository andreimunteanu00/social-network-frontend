import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  loginClick = () => {
    this.router.navigateByUrl('/login');
  }

  signupClick = () => {
    this.router.navigateByUrl('/signup')
  }

}
