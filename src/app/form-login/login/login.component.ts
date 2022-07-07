import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: any = {};
  signInForm: SignInForm;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngSubmit(){
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    console.log('login==============', this.signInForm);
    this.authService.signIn(this.signInForm).subscribe(data => {
      if (data.token !== undefined){
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRole(data.roles);
        this.router.navigate(['user-account']).then(()  => {
          window.location.reload();
        });
      }
    });
  }

}
