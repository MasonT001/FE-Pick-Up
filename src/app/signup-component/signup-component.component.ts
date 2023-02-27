import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})

@Injectable()
export class SignupComponentComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'first_name': new FormControl(null, Validators.required),
        'last_name': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null, Validators.required),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'password_confirmation': new FormControl(null, Validators.required)
      }),
    })
  }

  onUserCreated(user: any) {
    console.log(user.userData)
    this.http.post('https://pick-up-sports-api.herokuapp.com/api/v1/users/create', user.userData)
    .subscribe((res) => {
      console.log(res);
    });
  }

  // onSubmit() {
  //   console.log(this.signupForm)
  // }
}
