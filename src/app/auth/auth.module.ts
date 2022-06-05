import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { AuthComponent } from "./auth.component";
import { LoginGuard } from "./login.guard";

@NgModule({
  declarations: [AuthComponent,LoadingSpinnerComponent],
  imports:[
    RouterModule.forChild([{ path: '', component: AuthComponent ,canActivate:[LoginGuard]},]),
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
export class AuthModule{}
