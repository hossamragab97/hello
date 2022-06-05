import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-yuser',
  templateUrl: './yuser.component.html',
  styleUrls: ['./yuser.component.css']
})
export class YuserComponent implements OnInit {

   user!:{id:number , name:string};
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.user = {
    id:this.route.snapshot.params['id'],
    name:this.route.snapshot.params['name']
   };

   this.route.params.subscribe(
     (parms:Params) => {
         this.user.id= parms['id'];
         this.user.name= parms['name'];
    }
   )

  }


}
