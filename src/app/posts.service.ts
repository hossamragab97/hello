import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Subject, throwError } from "rxjs";
import { Post } from "./home/post.model";

@Injectable({ providedIn: 'root' })
export class PostSrevice {

    constructor(private http: HttpClient) { }

    error = new Subject<string>();

    createAndStore(title: string, content: string , arra?:Post[]) {
        const postData: Post = { title: title, content: content }
        this.http
            .post('https://my-project-a73ac-default-rtdb.firebaseio.com/posts.json', postData )
            .subscribe(res => {
                arra?.push(postData)
                console.log(res);
            }, error => {
                this.error.next(error.message);
            })
    }

    featchPosts() {
        return this.http.
            get<{ [ket: string]: Post }>('https://my-project-a73ac-default-rtdb.firebaseio.com/posts.json')
            .pipe(map(mapData => {
                const arr: Post[] = [];
                for (const key in mapData) {
                    if (mapData.hasOwnProperty(key)) {
                        arr.push({ ...mapData[key], id: key });
                    }
                }
                return arr;
            }) , catchError(err=>{
               return throwError(err.message)
            }))
    }

    deletePosts() {
        return this.http.delete('https://my-project-a73ac-default-rtdb.firebaseio.com/posts.json');
    }

}
