import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../auth/event.service';
import { Event } from '../shared/event-model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventService: EventService, private http: HttpClient) { }
  title = ''
  desc = ''
  sdt = ''
  edt = ''
  location = ''
  spots = ''

  ngOnInit(): void {
  }

  displayStyle = 'none'

  createEvent() {
    this.displayStyle = 'block'
  }

  submitEvent(title: string, desc: string, sdt: string, edt: string, location: string, spots: string) {
    this.displayStyle = 'none'
    this.eventService.addEvent({
      t: title,
      d: desc,
      sd: sdt,
      ed: edt,
      location: location,
      spots: spots
    })

    console.log(title, desc, sdt, edt, location, spots)
  }

}
