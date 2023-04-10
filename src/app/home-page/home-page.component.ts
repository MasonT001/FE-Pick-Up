import { Component, ContentChild, OnInit } from '@angular/core';
import { PostService } from '../auth/post.service';
import { UserService } from '../auth/user.service';
import { Event } from '../shared/event-model';
import { Post } from '../shared/post-model';
import { EventService } from '../auth/event.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private eventService: EventService, private http: HttpClient) { }
  user: any = null
  posts: Post[] = []
  postEditValue: any

  editImage = ''
  editContent = ''
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
      .subscribe((user) => {
        this.user = user
        console.log(user)
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

    this.postService.currentUserPostsBS.subscribe((posts) => {
      this.posts = posts
    })
    this.posts = this.postService.currentUserPosts
  }


  submitEdit(editContent, editImage, id) {
    this.postService.updatePost(editContent, editImage, id, this.postEditValue)
    this.postEditValue = null
  }


  deletePost(id) {
    this.postService.deletePost(id)
  }

  // ableToUpdate() {
  //  console.log(this.user.id)
  // }



}
