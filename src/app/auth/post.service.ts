// Live share is slow for me I will pull this down and inspect it, give me 5 minutes

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

  createPost(val: string, imageVal: string) {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/posts', {
      "image_path": imageVal,
      "content": val
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      this.currentUserPosts.push(res.payload.post)
      this.currentUserPostsBS.next(this.currentUserPosts)
      localStorage.setItem('post.id', JSON.stringify(res.payload.post))
    })
  }

  deletePost(id) {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.delete(`https://pick-up-sports-api.herokuapp.com/api/v1/posts/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      this.currentUserPosts = this.currentUserPosts.filter((post) => {
        return post.id !== id
      })
      this.currentUserPostsBS.next(this.currentUserPosts)
      localStorage.removeItem('post.id')
    })
  }

  updatePost(content, image, id: any, index) {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.put(`https://pick-up-sports-api.herokuapp.com/api/v1/posts/${id}`, {
      "image_path": image,
      "content": content
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.currentUserPosts[index] = res.payload.post
      this.currentUserPostsBS.next(this.currentUserPosts)
    })
  }
}

