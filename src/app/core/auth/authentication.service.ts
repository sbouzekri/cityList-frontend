import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  AUTHENTICATED_USER = 'authenticatedUser';
  public username: string = '';
  public password: string = '';
  private baseUrl = environment.serverUrl + '/api/account/';

  constructor(private http: HttpClient) {
  }

  authenticationService(username: string, password: string): any {
    return this.http.get(this.baseUrl,
      {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String): string {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string): void {
    localStorage.setItem(this.AUTHENTICATED_USER, username)
  }

  isUserLoggedIn(): boolean {
    const user = localStorage.getItem(this.AUTHENTICATED_USER);
    if (user === null) return false;
    return true
  }
}
