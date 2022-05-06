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
    email: [],
    password: []
  })

  constructor(private loginService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.loginForm.value!).subscribe(res => {
      console.log(res);
    })
  }

}
