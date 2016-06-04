import { Injectable, EventEmitter } from '@angular/core';
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
  checkLogin: EventEmitter<any> = new EventEmitter();
  
  constructor(private af: AngularFire) {
  }

  /** 判斷使用者是否已經有登入 */
  get isLogin(): boolean {
    let user = localStorage.getItem('objUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      return true;
    }
    return false;
  }
  
  /** 用Email登入 */
  login(cred): Observable<FirebaseAuthState> {
    let ob = Observable.fromPromise(this.af.auth.login(cred, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    }));
    return ob.do((data) => {      
      this.setUser(data);
    })
  }

  /** 用Facebook登入 */
  fbLogin() {
    let ob = Observable.fromPromise(this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['email']
    }));
    return ob.do((data) => {      
      this.setUser(data);
    })
  }
  
  /** 登出 */
  logout() {
    localStorage.removeItem('objUser');
    this.currentUser = undefined;
    this.af.auth.logout();
    this.checkLogin.emit(this.isLogin);
  }

  private setUser(user) {
    localStorage.setItem('objUser', JSON.stringify(user));
    this.currentUser = user;
    this.checkLogin.emit(this.isLogin);
  }
}
