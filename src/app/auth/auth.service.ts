import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  loggedIn: boolean = false

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  isLoggedIn() {
    return this.loggedIn
  }

  onUserLogin(user: any) {
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/users/login', user.userData,)
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.router.navigate(['/home'])
        localStorage.setItem('tokenValue', JSON.stringify(responseData.payload.token.value))
        this.userService.setUser(responseData.payload.user)
        this.loggedIn = true;
      });
  }

  onUserLogout() {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.delete('https://pick-up-sports-api.herokuapp.com/api/v1/users/logout', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    })
      .subscribe((res: any) => {
        console.log(res)
        localStorage.removeItem("tokenValue")
        this.router.navigate(['/login'])
      });
  }

  onUserCreated(user: any) {
    console.log(user.userData)
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/users/create', user.userData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  onGetUser() {
    let auth_token = localStorage.getItem('tokenValue')
    this.http.get('https://pick-up-sports-api.herokuapp.com/api/v1/users/me', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
    })
    .subscribe((res: any) => {
      console.log(res)
      
    })
  }
}