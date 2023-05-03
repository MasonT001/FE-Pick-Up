import { Component, OnInit } from '@angular/core';
import { PostService } from '../auth/post.service';
import { UserService } from '../auth/user.service';
import { Event } from '../shared/event-model';
import { Post } from '../shared/post-model';
import { EventService } from '../auth/event.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private eventService: EventService, private http: HttpClient) { }


  user: any = null
  username: any = ''
  posts: Post[] = []
  postEditValue: any

  editImage = ''
  editContent = ''
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
      .subscribe((user: any) => {
        this.user = user
        // console.log(user)
        if (user) {
          this.username = user.username
        }
      })
    let auth_token = localStorage.getItem('tokenValue')
    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/posts/home', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    })
      .subscribe((res: any) => {
        this.posts = res.payload
        console.log(this.posts)
      })

    this.postService.currentUserPostsBS.subscribe((res: any) => {
      this.posts = res
      console.log(res)
    })
    this.posts = this.postService.currentUserPosts
    console.log(this.posts)
  }


  submitEdit(editContent, editImage, id) {
    this.postService.updatePost(editContent, editImage, id, this.postEditValue)
    this.postEditValue = null
  }


  deletePost(id) {
    this.postService.deletePost(id)
  }

}
