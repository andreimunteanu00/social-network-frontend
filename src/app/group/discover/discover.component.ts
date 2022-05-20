import {Component, OnInit} from '@angular/core';
import {IGroup} from "../group.model";
import {GroupService} from "../group.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import Swal from "sweetalert2";

@Component({
  selector: 'app-group',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

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

  requestToJoinGroup(id: number) {
    this.groupService.requestJoin(id).subscribe((res: any) => {
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
    })
  }
}
