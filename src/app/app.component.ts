import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(private authService: AuthService, private router: Router) { }
  title = 'FE-Pick-Up';
  hasToken = false
  
  autoLogin() {
    if (localStorage.getItem('tokenValue')) {
      this.hasToken = true
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
