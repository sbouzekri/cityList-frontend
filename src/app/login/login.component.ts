import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../core/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result: any) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.router.navigate(['/city']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.snackBar.open(this.errorMessage, 'Undo', {
        duration: 3000
      });
    });
  }
}
