import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit{
  signupForm!: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'fullName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, ),
      'confirmPassword': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
