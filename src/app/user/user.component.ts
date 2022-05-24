import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser, User} from "./user.model";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  fileToUpload: File | null = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isSaving: boolean | undefined;

  file: any;
  userForm = this.fb.group({
    id: [],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    university: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
    profilePic: []
  })

  constructor(
    protected userService: UserService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
    this.userService.getUser(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.updateForm(res.body);
      console.log(this.userForm.value!);
    })
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: any): void {
    this.userForm.patchValue({
      profilePic: event.base64,
    });
  }

  save(): void {
    this.isSaving = true;
    const user = this.createFromForm();
    this.userService.save(user).subscribe((res: any) => {
      Swal.fire({
        title: 'success'
      })
    });
  }

  protected createFromForm(): IUser {
    return {
      ...new User(),
      id: this.userForm.get(['id'])!.value,
      username: this.userForm.get(['username'])!.value,
      firstName: this.userForm.get(['firstName'])!.value,
      lastName: this.userForm.get(['lastName'])!.value,
      birthDate: this.userForm.get(['birthDate'])!.value ? dayjs(this.userForm.get(['birthDate'])!.value, 'YYYY-MM-DD') : undefined,
      email: this.userForm.get(['email'])!.value,
      profilePic: this.userForm.get(['profilePic'])!.value,
      university: this.userForm.get(['university'])!.value
    };
  }

  protected updateForm(user: IUser): void {
    this.userForm.patchValue({
      id: user.id!,
      username: user.username!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      birthDate: user.birthDate!,
      email: user.email!,
      university: user.university!,
      profilePic: user.profilePic!
    });
  }

}
