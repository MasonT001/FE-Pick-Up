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
        'fullName': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'confirmPassword': new FormControl(null, Validators.required)
      }),
    })
  }

  onUserCreated(user: {fullName: string, email: string, password: string, confirmPassword: string}) {
    console.log(user)
    this.http.post('https://pick-up-sports-api.herokuapp.com/users.json', user)
    .subscribe((res) => {
      console.log(res);
    });
  }

  // onSubmit() {
  //   console.log(this.signupForm)
  // }
}
