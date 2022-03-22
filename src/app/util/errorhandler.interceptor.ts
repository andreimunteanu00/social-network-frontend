import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse,
} from "@angular/common/http";

import { Observable } from "rxjs";
import {tap} from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err.status === 401) {
          Swal.fire({
            title: err.error
          })
        }
    })
    )
  }
}
