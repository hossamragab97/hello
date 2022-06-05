import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { YComponent } from "./table.component";
import { YuserComponent } from "./yuser/yuser.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Authentication } from "../autha.guard";

const Yroute:Routes=[
  {
    path: '',
    canActivate: [Authentication],
    children:[
     { path: '', component: YComponent},
     { path: ':id/:name', component: YuserComponent},
    ]
    },
]

@NgModule({
  declarations:[YComponent,YuserComponent],
  imports:[
    RouterModule.forChild(Yroute) ,
    DataTablesModule ,
    FormsModule,
    CommonModule,
    NgxChartsModule,
  ]
})
export class TableModule{}
