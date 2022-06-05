import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError , tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   user = new BehaviorSubject<User>(null!);
   private tokenExpirationTimer: any;


    constructor(private http: HttpClient , private router:Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSU5CKgRg8iFlz0vH3alow96U7JgnrHFM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandel) , tap(resData => {
            this.handelAuth(resData.email , resData.localId ,resData.idToken ,+resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSU5CKgRg8iFlz0vH3alow96U7JgnrHFM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandel) ,tap(resData => {
            this.handelAuth(resData.email , resData.localId ,resData.idToken ,+resData.expiresIn);
        }));
    }

  //   islogedin = false
  //   loginnn(email: string, password: string){
  //     const emaillog=email;
  //     localStorage.setItem('userData' , emaillog)
  //   }
  //    gettoken() {
  //   console.log('localStorage.getItem', localStorage.getItem('userData'));
  //   // return !!localStorage.getItem("SeesionUser");
  //   if (localStorage.getItem('userData') !=null) {
  //     console.log("yes user");
  //     this.islogedin=true
  //     console.log(this.islogedin);
  //     return true;
  //   } else {
  //     console.log("no user");
  //     return false;
  //   }
  // }

  logoutttt() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }


    autoLogin() {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);
        if (!userData) {
          return;
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.autoLogout(expirationDuration);
        }
      }

      logout() {
        this.user.next(null!);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }

      autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration);
      }

      private handelAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
      }

    private errorHandel(errorRes: HttpErrorResponse) {
        let errorMessage = "an unknowen error";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email not exist';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'The password is not correct';
                break;

        }
        return throwError(errorMessage)
    }

}
