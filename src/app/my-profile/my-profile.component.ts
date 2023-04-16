import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../auth/event.service';
import { Event } from '../shared/event-model';
import { PostService } from '../auth/post.service';
import { Post } from '../shared/post-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private eventService: EventService, private postService: PostService, private http: HttpClient) { }

  username: any = ''
  events: Event[] = []
  posts: Post[] = []
  eventCount: number = 0
  postCount: number = 0
  eventEditValue: any
  postEditValue: any


  user: any = null
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
      .subscribe((user) => {
        this.user = user
        if (user) {
          this.username = user.username
        }
      })

    this.eventService.currentUserEventsBS
      .subscribe((events) => {
        this.events = events
      })
    this.events = this.eventService.currentUserEvents

    this.postService.currentUserPostsBS.subscribe((posts) => {
      this.posts = posts
    })

    let auth_token = localStorage.getItem('tokenValue')
    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/events/my_events', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res.payload.length)
      this.eventCount = res.payload.length
      this.events = res.payload
    })

    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/posts/home', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.postCount = res.payload.length
      this.posts = res.payload
    })
  }

  onGetUser() {
    this.authService.onGetUser()
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

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
  }


  submitEdit(editContent, editImage, id) {
    this.postService.updatePost(editContent, editImage, id, this.postEditValue)
    this.postEditValue = null
  }

  deletePost(id) {
    this.postService.deletePost(id)
  }

}
