import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {SignUpForm} from '../../model/SignUpForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  status = 'Please fill in the form to register';
  form: any = {};
  hide = true;
  email = new FormControl('', [
    Validators.required,
    Validators.email
    ]);

  signUpForm: SignUpForm;
  error1: any = {
    message: 'nouser'
  };
  error2: any = {
    message: 'noemail'
  };
  success: any = {
    message: 'yes'
  };
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }

  ngSubmit(){
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.error1)){
        this.status = 'username is existed! Please try again!';
      }
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!';
      }
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(data) == JSON.stringify(this.success)){
        this.status = 'Create account success!';
      }
    });
  }
}
