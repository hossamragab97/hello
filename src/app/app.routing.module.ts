import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeModule } from "./home/home.module";
import { LoginModule } from "./login.auth/login.module";
import { NotfoundComponent } from "./notfound/notfound.component";
import { TableModule } from "./y/table.module";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path:'home' , loadChildren:()=>import ('./home/home.module').then(m => m.HomeModule)},
    { path:'table' , loadChildren:()=>import ('./y/table.module').then(m => m.TableModule)},
    { path:'auth' , loadChildren:()=>import ('./login.auth/login.module').then(m => m.LoginModule)},

    // { path: 'auth', component: LoginComponent },
    { path: 'not-found', component: NotfoundComponent },
    { path: '**', redirectTo: 'not-found' },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule,HomeModule,TableModule,LoginModule]
})

export class AppRoutingModule { }
