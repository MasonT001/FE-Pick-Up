import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './auth/user.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FE-Pick-Up';

  ngOnInit(): void {
    let auth_token = localStorage.getItem('tokenValue')
    if (JSON.parse(localStorage.getItem('tokenValue'))) {
      this.router.navigate(['/home'])
      this.authService.loggedIn = true
      this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/users/me', {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${auth_token}`
        })
      })
      .subscribe((res: any) => {
        console.log(res.payload)
        this.userService.setUser(res.payload)
      })
    }
  }
  
  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private userService: UserService) { }


}


