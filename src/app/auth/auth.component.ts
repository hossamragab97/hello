import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent {

    constructor(private autaservice: AuthService, private router: Router ,public translate:TranslateService) { }

    islogin = true;
    isloading = false;
    email = "";
    password = "";
    error = "";

    switchmode() {
        this.islogin = !this.islogin;
    }

    onsubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.isloading = true;
        let authObs: Observable<AuthResponseData>;
        if (this.islogin) {
            authObs = this.autaservice.login(this.email, this.password);
        } else {
            authObs = this.autaservice.signUp(this.email, this.password);
        }
        authObs.subscribe(
            res => {
                if (this.islogin) {
                this.router.navigate(['/home'])
                } console.log(res)
                this.isloading = false;
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isloading = false;
            }
        );
        form.reset()
    }
}
