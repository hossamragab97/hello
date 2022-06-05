import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { Authentication } from "../autha.guard";
import { HomeComponent } from "./home.component";



@NgModule({
  declarations:[
    HomeComponent,
  ],
  imports:[
    RouterModule.forChild([{ path: '', component: HomeComponent,
    canActivate: [Authentication]
   }]),
    ReactiveFormsModule ,
    FormsModule ,
    CommonModule,
    TranslateModule.forChild({
      defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[RouterModule]
})
export class HomeModule{}
