import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { LoginGuard } from "../login.guard";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations:[LoginComponent],
    imports:[
        RouterModule.forChild([{ path: '', component: LoginComponent ,canActivate:[LoginGuard]},]),
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TranslateModule.forChild({
          defaultLanguage:'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      exports:[RouterModule]
})
export class LoginModule{}