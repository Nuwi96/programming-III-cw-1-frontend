import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  show = false;
  isSignIn = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
              private toast: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSignIn = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isSignIn = false;
        this.router.navigate(['/admin/dashboard']);
      },
      err => {
        console.log(err);
        this.isSignIn = false;
        this.toast.error(err.error.error, 'Login Error!');
      }
    );
  }

}
