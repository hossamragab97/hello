import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  itemValue = new BehaviorSubject(localStorage.getItem('userData'));
  constructor() {
  }
}
