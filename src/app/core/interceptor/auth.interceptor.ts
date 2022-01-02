import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../auth/authentication.service";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpProgressEvent | HttpResponse<any> | any> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('account') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if ((<HttpErrorResponse>err).status === 401) {
              this.snackBar.open("Unauthorized user!", 'Undo', {
                duration: 3000
              });
            }
            return throwError(err);
          }
        ));
    }
  }

}
