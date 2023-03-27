import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../shared/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentUserEvents: Event[] = [new Event('Neosho, MO', '12:30', 10)]
  currentUserEventsBS: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }
}
