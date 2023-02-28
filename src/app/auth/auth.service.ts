import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService { 

    constructor(private http: HttpClient, private router: Router) { }

    onUserLogin(user: any) {
        this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/users/login', user.userData)
        .subscribe((responseData) => {
          console.log(responseData);
          this.router.navigate(['/home'])
          localStorage.setItem('currentUser', JSON.stringify(responseData))
        });
      }

      onUserLogout() {
        let auth_token = this.getAuthToken()
        this.http.delete('https://pick-up-sports-api.herokuapp.com/api/v1/users/logout', { headers: new HttpHeaders({
          'Authorization': `Bearer ${auth_token}`
        })})
        .subscribe((res: any) => {
          // console.log(res)
        });
        localStorage.removeItem("currentUser") 
      }

      getAuthToken() {
        return localStorage.getItem('token.value')
      }
}