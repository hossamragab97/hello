import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit,OnDestroy {

  col=true;

  private userSub?:Subscription;
  isAuth=false;

  currentLang!:string;

  constructor(
    // private authservice:AuthService ,
    public translate:TranslateService , 
    private router:Router ,
    private authooo:AuthService)
     {
    this.currentLang=localStorage.getItem('currentLang')|| 'en';
    this.translate.use(this.currentLang);
  }


  ChangeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLang' , lang)
  }

  email=""
  ngOnInit(): void {
    // this.userSub = this.authservice.user.subscribe(user => {
    //          this.isAuth= !!user;
    // });
    this.userSub = this.authooo.itemValue.subscribe(user => {
      this.isAuth= !!user;
      if(user != null){
        this.email=JSON.parse(user!).email
      }
    });
  }


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onLogout(){
    this.authooo.itemValue.next(null!)
    localStorage.removeItem('userData');
    // this.isAuth=false
     this.router.navigate(['/auth'])
    // this.authservice.logout();
  }
}


// gfdgdfgdfgdf