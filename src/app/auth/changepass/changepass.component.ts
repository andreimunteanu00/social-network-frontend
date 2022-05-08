import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {

  changePasswordForm = this.fb.group({
    email: [],
    oldPassword: [],
    newPassword: []
  })

  constructor(
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected router: Router
  ) {}

  ngOnInit(): void {
  }

  changePass() {
    const email = this.changePasswordForm.get(['email'])?.value!
    const oldPassword = this.changePasswordForm.get(['oldPassword'])?.value!
    const newPassword = this.changePasswordForm.get(['newPassword'])?.value!
    this.authService.changepass(email, oldPassword, newPassword).subscribe((res: any) => {
      Swal.fire({
        title: res.body.success,
        icon: "success",
        confirmButtonColor: "green"
      })
      this.router.navigate(['/login']);
    });
  }
}
