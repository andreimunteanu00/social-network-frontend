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
    return this.http.get(this.resourceUrl + "/userNotIn/" + id)
  }
}
