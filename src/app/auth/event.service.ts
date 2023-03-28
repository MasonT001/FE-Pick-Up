import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../shared/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentUserEvents: Event[] = [new Event('Sunday Football', 'lorem ipsem', '03/27/23', '03/27/23', 'Morris Park', '10', 0)]
  currentUserEventsBS: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }

  addEvent(event: any) {
    this.currentUserEvents.push(event)
    this.currentUserEventsBS.next(this.currentUserEvents)
  }
}
