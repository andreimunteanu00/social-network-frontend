import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {flatMap} from "rxjs/internal/operators";
import {Chat, IChat} from "./chat.model";
import {ChatService} from "./chat.service";

@Injectable({ providedIn: 'root' })
export class ChatResolver implements Resolve<IChat> {
  constructor(private service: ChatService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getById(id).pipe(
        flatMap((chat: HttpResponse<Chat>) => {
          if (chat.body) {
            return of(chat.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Chat());
  }
}
