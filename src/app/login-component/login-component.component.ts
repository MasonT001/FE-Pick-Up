import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  signinForm!: FormGroup

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
      }),
    })
  }

  // onSubmit() {
  //   console.log(this.signinForm)
  // }

  onUserLogin(user: any) {
    console.log(user.userData)
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/users/login', user.userData)
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/home'])
    });
  }
}
