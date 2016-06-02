import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {
  AngularFire,
  AuthMethods,
  FirebaseAuthState,
  AuthProviders } from 'angularfire2';


@Injectable()
export class AuthService {

  currentUser: FirebaseAuthState;

  constructor(private af: AngularFire) {
  }

  get isLogin(): boolean {
    let user = localStorage.getItem('objUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      return true;
    }
    return false;
  }
  login(cred): Observable<FirebaseAuthState> {
    let ob = Observable.fromPromise(this.af.auth.login(cred, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    }));
    return ob.do((data) => {
      console.log(data);
      this.setUser(data);
    })
  }

  fbLogin() {
    let ob = Observable.fromPromise(this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['email']
    }));
    return ob.do((data) => {
      console.log(data);
      this.setUser(data);
    })
  }

  logout() {
    localStorage.removeItem('objUser');
    this.currentUser = undefined;
    this.af.auth.logout();
  }

  private setUser(user) {
    localStorage.setItem('objUser', JSON.stringify(user));
    this.currentUser = user;
  }
}
