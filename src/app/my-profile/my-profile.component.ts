import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../auth/event.service';
import { Event } from '../shared/event-model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userService:UserService, private authService: AuthService, private eventService: EventService) { }

  events: Event[] = []
  eventEditValue: any
  postEditValue: any


  user: any = null
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
    .subscribe((user) => {
      this.user = user
    })

    this.eventService.currentUserEventsBS
    .subscribe((events) => {
      this.events = events
    })
  this.events = this.eventService.currentUserEvents
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

}
