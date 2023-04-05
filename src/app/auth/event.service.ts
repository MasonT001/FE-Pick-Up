import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../shared/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentUserEvents: Event[] = [new Event('Sunday Football', 'lorem ipsem', '03/27/23', '03/27/23', 'Morris Park', '10', 0)]
  currentUserEventsBS: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  addEvent(event: any) {
    console.log(this.currentUserEvents)
    let auth_token = localStorage.getItem('tokenValue')
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/events', {
      title: 'Title test',
      description: 'Description test',
      start_date: 'Mon, 01 Jan -4712 00:00:00 +0000',
      end_date: 'Tue, 02 Jan -4712 00:00:00 +0000',
      location: 'Neosho',
      num_players: 6
    }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    }).subscribe((res: any) => {
      console.log(res)
      this.currentUserEvents.push(event)
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
    })
  }

  updateEvent(event, id, index) {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.put(`https://pick-up-sports-api.herokuapp.com/api/v1/events/${id}`, {
      title: 'Test Title',
      description: 'Test Description',
      start_date: 'Mon, 01 Jan -4712 00:00:00 +0000',
      end_date: 'Tue, 02 Jan -4712 00:00:00 +0000',
      location: 'Neosho',
      num_players: 6
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
