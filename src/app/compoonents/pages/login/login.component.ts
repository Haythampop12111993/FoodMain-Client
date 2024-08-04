import { GlobleService } from './../../../services/globle/globle.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/auth/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private userAuthService: UserAuthService,
    private ToastrService: ToastrService,
    private Router: Router,
    private GlobleService: GlobleService
  ) {}
  get controls() {
    return this.loginForm.controls;
  }
  login() {
    console.log(this.loginForm.value);
    this.userAuthService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.ToastrService.success(res.message);
        localStorage.setItem('userToken', res.data.token);
        this.GlobleService.isLogin = true;
        this.GlobleService.userImg = res.data.userData.image;
        this.Router.navigate(['/']);
      },

      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message);
      },
    });
  }
}
