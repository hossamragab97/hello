import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PostSrevice } from '../posts.service';
import { Post } from './post.model';
 import { Router } from '@angular/router';
// import { UsersStatus } from '../users.service';

@Component({
  selector: 'app-x',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,OnDestroy {

  constructor(private router:Router, private http:HttpClient , private postService:PostSrevice ,public translate:TranslateService ,private fb: FormBuilder){}

  login=true;

  switchmode(){
    this.login=!this.login;
  }

  signFormGroup = this.fb.group({
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    phone: ['',[Validators.required  , Validators.pattern("(01)[0-9]{9}")]],
    email: ['',[Validators.required , Validators.email]],
    password: ['', [Validators.required , Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&^])(?=[^A-Z]*[A-Z]).{8,30}$/),]],
  });

  titlePost=""
  content=""

  error=null;
  private errorSub!:Subscription;

  loadPosts:Post[]=[];
  isFeatch=false;

  createPost(postData: Post ) {
    this.postService.createAndStore(postData.title,postData.content ,this.loadPosts);
  }

   fetch(){
    this.isFeatch=true;
    this.postService.featchPosts().subscribe(posts=>{
      this.isFeatch=false;
      this.loadPosts=posts;
    } , error => {
      this.error =error.message;
   });
   }

   clear(){
     this.postService.deletePosts().subscribe(
       ()=>{
         this.loadPosts=[]
       }
     )
   }

   onsubmit(){
    this.router.navigate(['table'])
  }


  gender=['male' , 'female']
  hobby!:[]

  ngOnInit(): void {
   this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error!=errorMessage;
    });
    this.isFeatch=true;
    this.postService.featchPosts().subscribe(posts=>{
      this.isFeatch=false;
      this.loadPosts=posts;
    }, error => {
      this.error =error.message;
   });

    // this.signFormGroup=new FormGroup({
    //     'firstname':new FormControl('',Validators.required),
    //     'lastname':new FormControl('',Validators.required),
    //     'phone':new FormControl('',[Validators.required  , Validators.pattern("(01)[0-9]{9}")]),
    //     'email':new FormControl('',[Validators.required , Validators.email]),
    //     'password':new FormControl('' , [Validators.required , Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)        ,]),
    // })

    console.log(this.signFormGroup)
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }


  // getSampleArrayControls() {
  //   return (<FormArray>this.signFormGroup.get('hobby')).controls;
  // }

  // add(){
  //   (<FormArray>this.signFormGroup.get('hobby')).push(
  //     new FormControl(null,Validators.required)
  //   )
  // }



  // constructor(private users: UsersStatus, private route: Router) { }
  // userActive = this.users.userActive;
  // userInActive = this.users.userInActive;
  // inActive(index: number) {
  //   this.userInActive.push(this.userActive[index]);
  //   this.userActive.splice(index, 1);
  // }

  // Active(index: number) {
  //   this.userActive.push(this.userInActive[index]);
  //   this.userInActive.splice(index, 1)
  // }

  // goTOLink() {
  //   this.route.navigate(['/y'])
  //   alert('hello hossam')
  // }







}


