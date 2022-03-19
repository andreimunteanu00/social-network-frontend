import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [],
    password: []
  })

  constructor(private loginService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login(): void {
    const username = this.loginForm.get(['username'])!.value;
    const password = this.loginForm.get(['password'])!.value;
    this.loginService.login(username, password).subscribe(res => {
      console.log(res);
    })
  }

}
