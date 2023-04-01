import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../shared/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUserPosts: Post[] = []
  currentUserPostsBS: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private http: HttpClient) { }

  setPosts(currentUserPosts: Post[]) {
    this.currentUserPosts = currentUserPosts
    this.currentUserPostsBS.next(currentUserPosts)
  }

  addPost(post: any) {
    // this.currentUserPosts.push(post)
    // this.currentUserPostsBS.next(this.currentUserPosts)
  }

  createPost(val: string, imageVal: string) {
    let auth_token = localStorage.getItem('tokenValue')
    // this.postService.addPost(new Post(imageVal, val, 1))
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/posts', {
      "image_path": imageVal,
      "content": val
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((post: any) => {
      Object.values(post)
      console.log(post)
    })
  }

  deletePost(id) {
    // this.currentUserPosts = this.currentUserPosts.filter((post) => {
    //   return post.id !== id
    // })
    // this.currentUserPostsBS.next(this.currentUserPosts)
    let auth_token = localStorage.getItem('tokenValue')
    this.http.delete('https://pick-up-sports-api.herokuapp.com/api/v1/posts/1', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    })
  }

  updatePost(post, id: any, index) {
    // let i = 0;
    // this.currentUserPosts[index] = post
    // this.currentUserPostsBS.next(this.currentUserPosts)
    let auth_token = localStorage.getItem('tokenValue')

    this.http.put('https://pick-up-sports-api.herokuapp.com/api/v1/posts/1', {
      "image_path": post,
      "content": post
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((update: any) => {
      console.log(update)
    })
  }
}

