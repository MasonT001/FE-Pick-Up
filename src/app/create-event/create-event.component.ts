import { Component, OnInit } from '@angular/core';
import { EventService } from '../auth/event.service';
import { Event } from '../shared/event-model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventService: EventService) { }
  title = ''
  desc = ''
  sdt = ''
  edt = ''
  location = ''
  spots = ''
  id = this.eventService.currentUserEvents.length + 1

  ngOnInit(): void {
  }

  displayStyle = 'none'

  createEvent() {
    this.displayStyle = 'block'
  }

  submitEvent(title: string, desc: string, sdt: string, edt: string, location: string, spots: string) {
    this.displayStyle = 'none'
    this.title = title
    this.desc = desc
    this.sdt = sdt
    this.edt = edt
    this.location = location
    this.spots = spots
    this.eventService.addEvent(new Event(title, desc, sdt, edt, location, spots, this.id))
    
    console.log(title, desc, sdt, edt, location, spots, this.id)
  }

}
