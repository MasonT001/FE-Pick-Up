import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagingComponent implements OnInit {
  messages: string[] = [];
  messageInput: string = '';

  constructor() { }

  ngOnInit(): void { }

}

