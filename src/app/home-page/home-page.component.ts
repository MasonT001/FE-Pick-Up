import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: any = null
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
    .subscribe((user) => {
      this.user = user
    })
  }

}
