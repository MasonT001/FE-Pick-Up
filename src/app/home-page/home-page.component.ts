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
    let auth_token = localStorage.getItem('tokenValue')
    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/posts/home', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    })
      .subscribe((res: any) => {
        console.log(res.payload)

        this.posts = res.payload
        console.log(this.posts)
      })

    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/events/1', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      this.events = res.payload
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
    this.postService.updatePost(editContent, id, this.postEditValue)
    this.postEditValue = null
  }


  deletePost(id) {
    this.postService.deletePost(id)
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
  }

  updateEvent(editImage, editTitle, editDescription, editStartDate, editEndDate, editLocation, editSpots, id) {
    this.eventService.updateEvent({
      t: editTitle,
      i: editImage,
      d: editDescription,
      sd: editStartDate,
      ed: editEndDate,
      el: editLocation,
      es: editSpots
    }, {
      id: id
    }, {
      index: this.eventEditValue
    }
    );
    this.postEditValue = null
    // this.eventService.currentUserEvents[id] = new Event(editContent, editImage, id)

  }

}
