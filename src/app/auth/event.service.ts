import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../shared/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentUserEvents: Event[] = []
  currentUserEventsBS: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  addEvent(event) {
    console.log(this.currentUserEvents)
    let auth_token = localStorage.getItem('tokenValue')
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/events', {
      title: event.t,
      description: event.d,
      start_date: event.sd,
      end_date: event.ed,
      location: event.location,
      num_players: event.spots
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.currentUserEvents.push(res.payload.event)
      this.currentUserEventsBS.next(this.currentUserEvents)
    })
  }

  deleteEvent(id) {
    this.currentUserEventsBS.next(this.currentUserEvents)
    let auth_token = localStorage.getItem('tokenValue')
    this.http.delete(`https://pick-up-sports-api.herokuapp.com/api/v1/events/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.currentUserEvents = this.currentUserEvents.filter((event) => {
        return event.id !== id
      })
      this.currentUserEventsBS.next(this.currentUserEvents)
    })
  }

  updateEvent(event, id, index) {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.put(`https://pick-up-sports-api.herokuapp.com/api/v1/events/${id}`, {
      title: event.t,
      description: event.d,
      start_date: event.sd,
      end_date: event.ed,
      location: event.el,
      num_players: event.es
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.currentUserEvents[index] = event
      this.currentUserEventsBS.next(this.currentUserEvents)
    })
  }
}
