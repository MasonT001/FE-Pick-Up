import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any
  currentUserBehavioralSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }

  setUser(user:any) {
    this.currentUser = user
    this.currentUserBehavioralSubject.next(user)
  }
}
