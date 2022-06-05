import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth : AuthService
  )
  {}


  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  emailCheck="hossam@gmail.com";
  passwordCheck="123456";
  error=false;
  onlogin() {
    if (this.loginForm.invalid) {
    } else {
      if(this.loginForm.get('email')?.value===this.emailCheck && this.loginForm.get('password')?.value === this.passwordCheck){
        const email=this.loginForm.get('email')?.value
        localStorage.setItem('userData',  JSON.stringify({
          'email':email,
        }));
        this.auth.itemValue.next(JSON.stringify({
          'email':email
        }))
      this.router.navigate(['/home']);
      }else{
        this.error=true;
      }
      // this.auth.islogedin=true
      // console.log( this.isloggedin)
      // this.router.navigateByUrl('/home');
    }
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}
}

