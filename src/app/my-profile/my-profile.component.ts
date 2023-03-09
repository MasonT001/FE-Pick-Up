import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userService:UserService, private authService: AuthService) { }

  user: any = null
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
    .subscribe((user) => {
      this.user = user
    })
  }

  onGetUser() {
    this.authService.onGetUser()
  }

}
