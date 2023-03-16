import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../shared/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUserPosts: Post[] = [new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJIvPXPFZs2jSHcQn6K7IbEba53D_hdRbqg&usqp=CAU', 'A beautiful bonsai tree', 10), new Post('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fuji-and-sakura-royalty-free-image-144483163-1562593125.jpg?crop=1.00xw:0.752xh;0,0.236xh&resize=1200:*', 'Some pretty Sakuras', 11)]
  currentUserPostsBS: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor() { }

  setPosts(currentUserPosts: Post[]) {
    this.currentUserPosts = currentUserPosts
    this.currentUserPostsBS.next(currentUserPosts)
  }

  addPost(post: any) {
    this.currentUserPosts.push(post)
    this.currentUserPostsBS.next(this.currentUserPosts)
  }

  deletePost() {
    // this.currentUserPosts.filter(this.currentUserPosts,)
  }

  updatePost(post, id, index) {
    let i = 0;
    this.currentUserPosts[index] = post
  }
}
 
