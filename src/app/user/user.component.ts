import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser, User} from "./user.model";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import Swal from "sweetalert2";

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
    username: [],
    email: [],
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
      email: this.userForm.get(['email'])!.value,
      profilePic: this.userForm.get(['profilePic'])!.value,
    };
  }

  protected updateForm(user: IUser): void {
    this.userForm.patchValue({
      id: user.id!,
      username: user.username!,
      email: user.email!,
      profilePic: user.profilePic!
    });
  }

}
