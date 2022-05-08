import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected router: Router
  ) {}

  registerForm = this.fb.group({
    username: [],
    email: [],
    university: [],
    password: [],
    confirmPassword: [],
    terms: []
  })

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.registerForm.value!).subscribe((res: any) => {
      Swal.fire({
        title: res.body.success,
        icon: "success",
        confirmButtonColor: "green"
      })
      this.router.navigate(['/login']);
    })
  }
}
