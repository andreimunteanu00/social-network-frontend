import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  resourceUrl = 'http://localhost:8080/api/group';

  constructor(protected http: HttpClient) {}

  getGroups() {
    return this.http.get(this.resourceUrl, { observe: "response" });
  }

  getGroup(id: number) {
    return this.http.get(this.resourceUrl + "/" + id, { observe: "response" });
  }

  getGroupsUserNotIn(id: number) {
    return this.http.get(this.resourceUrl + "/userNotIn/" + id);
  }

  requestJoin(id: number) {
    return this.http.post(this.resourceUrl + '/' + id + '/join', null, { observe: "response" });
  }

  getGroupsUserIn(id: number) {
    return this.http.get(this.resourceUrl + "/userIn/" + id, { observe: "response" });
  }

  listPendingUsers(id: number) {
    return this.http.get(this.resourceUrl + "/" + id + "/pending", { observe: "response" });
  }

  approveRequest(groupId: number, userId: number) {
    return this.http.post(this.resourceUrl + "/" + groupId + "/approve", {userId}, { observe: "response" });
  }
}
