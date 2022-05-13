import { Component, OnInit } from '@angular/core';
import {IGroup} from "../group.model";
import {GroupService} from "../group.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "../../user/user.model";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.scss']
})
export class MygroupComponent implements OnInit {

  group: IGroup | undefined;
  pendingUsers: IUser[] | undefined;
  moderator: boolean | undefined;

  constructor(
    protected groupService: GroupService,
    protected userService: UserService,
    protected jwtHelper: JwtHelperService,
    public authService: AuthService,
    protected modalService: NgbModal,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.groupService.getGroup(id).subscribe((res: any) => {
      this.group = res.body;
      let bool1 = this.authService.hasRole('MODERATOR');
      let bool2;
      this.userService.checkModerator(this.group!.id!).subscribe((res: any) => {
        bool2 = res.body;
        this.moderator = bool1 && bool2;
      });
    })
  }

  seePendingUsers(id: number, modal: any) {
    this.groupService.listPendingUsers(id).subscribe((res: any) => {
      this.pendingUsers = res.body;
      this.openModal(modal);
    })
  }

  openModal(modalContent: any): void {
    this.modalService.open(modalContent, {
      animation: true,
      scrollable: true,
      centered: true,
      size: 'xl'
    });
  }

  approveOrRejectRequest(groupId: number, userId: number, response: boolean) {
    this.groupService.approveOrRejectRequest(groupId, userId, response).subscribe((res: any) => {
      if (res.body.success) {
        Swal.fire({
          title: res.body.success,
          icon: "success",
          confirmButtonColor: "green"
        })
      } else {
        Swal.fire({
          title: res.body.error,
          icon: "info",
          confirmButtonColor: "blue"
        })
      }
    });
  }

  private checkModerator() {
    let bool1 = this.authService.hasRole('MODERATOR');
    let bool2;
    this.userService.checkModerator(this.group!.id!).subscribe((res: any) => {
      bool2 = res.body;
      return bool1 && bool2;
    });
  }
}
