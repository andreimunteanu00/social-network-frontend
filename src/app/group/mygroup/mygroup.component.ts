import { Component, OnInit } from '@angular/core';
import {IGroup} from "../group.model";
import {GroupService} from "../group.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "../../user/user.model";

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.scss']
})
export class MygroupComponent implements OnInit {

  group: IGroup | undefined;
  pendingUsers: IUser[] | undefined;

  constructor(
    protected groupService: GroupService,
    protected jwtHelper: JwtHelperService,
    public authService: AuthService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    const id = token.userId;
    this.groupService.getGroup(id).subscribe((res: any) => {
      this.group = res.body;
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

  approveRequest(groupId: number, userId: number) {
    this.groupService.approveRequest(groupId, userId).subscribe();
  }

  rejectRequest(groupId: number, userId: number) {

  }
}
