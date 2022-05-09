import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {IUser, User} from "./user.model";
import {UserService} from "./user.service";
import {EMPTY, Observable, of} from "rxjs";
import {flatMap} from "rxjs/internal/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<IUser> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getUser(id).pipe(
        flatMap((user: HttpResponse<User>) => {
          if (user.body) {
            return of(user.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new User());
  }
}
