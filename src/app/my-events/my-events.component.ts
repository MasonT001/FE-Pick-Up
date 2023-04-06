import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../auth/event.service';
import { Event } from '../shared/event-model';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  myEvents: Event[] = []
  constructor(private http: HttpClient, private eventService: EventService) { }

  ngOnInit(): void {
      let auth_token = localStorage.getItem('tokenValue')
      this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/events/my_events', {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${auth_token}`
        })
      }).subscribe((res: any) => {
        this.myEvents = res.payload
      })


      this.eventService.currentUserEventsBS.subscribe((events) => {
        this.myEvents = events
      })
    }

    deleteEvent(id) {
      this.eventService.deleteEvent(id)
    }
}
