import { Component, ContentChild, OnInit } from '@angular/core';
import { PostService } from '../auth/post.service';
import { UserService } from '../auth/user.service';
import { Event } from '../shared/event-model';
import { Post } from '../shared/post-model';
import { EventService } from '../auth/event.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private eventService: EventService) { }
  user: any = null
  posts: Post[] = []
  postEditValue: any

  events: Event[] = []
  eventEditValue: any

  editImage = ''
  editContent = ''
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
    .subscribe((user) => {
      this.user = user
      console.log(user)
    })

    this.postService.currentUserPostsBS.subscribe((posts) => {
      this.posts = posts
    })
    this.posts = this.postService.currentUserPosts

    this.eventService.currentUserEventsBS
    .subscribe((events) => {
      this.events = events
    })
    this.events = this.eventService.currentUserEvents
  }

  
  submitEdit(editImage, editContent, id) {
    console.log(editContent, editImage, id)
    this.postService.updatePost({
      c: editContent,
      i: editImage
    }, {
      id: this.postEditValue
    }, {
      index: this.postEditValue
    }
    );
    this.postEditValue = null
    this.postService.currentUserPosts[id] = new Post(editContent, editImage, id)
    this.postService.currentUserPostsBS.next(this.postService.currentUserPosts)
    console.log(this.postService.currentUserPosts)
}
  deletePost(id) {
    this.postService.deletePost(id)
  }

}
