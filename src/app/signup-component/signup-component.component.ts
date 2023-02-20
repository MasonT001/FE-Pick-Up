import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit{
  signupForm!: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'fullName': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'confirmPassword': new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
