import { Component, OnInit } from '@angular/core';
import {IGroup} from "./group.model";
import {GroupService} from "./group.service";
import {group} from "@angular/animations";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: IGroup[] | undefined;

  constructor(
    protected groupService: GroupService,
    protected jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    const id = token.userId;
    this.groupService.getGroupsUserNotIn(id).subscribe((res: any) => {
      this.groups = res.body;
    })
  }

}
