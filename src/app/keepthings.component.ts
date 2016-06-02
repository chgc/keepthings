import { Component } from '@angular/core';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, Validators } from '@angular/common';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AngularFire, FirebaseListObservable, AuthMethods,
  AuthProviders } from 'angularfire2';

import { AuthService } from './shared';

import { ProfileComponent } from './+profile';

@Component({
  moduleId: module.id,
  selector: 'keepthings-app',
  templateUrl: 'keepthings.component.html',
  styleUrls: ['keepthings.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  providers: [
    MdIconRegistry,
    MdRadioDispatcher,
    AuthService
  ]
})
@RouteConfig([
  { path: '/profile', name: 'Profile', component: ProfileComponent },
])
export class KeepthingsAppComponent {
  formShowing = false;
  title = 'keepthings!';
  regForm: ControlGroup;
  loginForm: ControlGroup;
  currentItem: any;
  isLogin: boolean = false;

  items: FirebaseListObservable<any[]>;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind",
      link: "Profile"
    },
    {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets",
      link: "Profile"
    }
  ];
  constructor(private af: AngularFire, private builder: FormBuilder, private auth: AuthService) {
    // 
    this.loginForm = this.builder.group({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required)

    })
  }

  ngOnInit() {
    this.isLogin = this.auth.isLogin;
    if (this.isLogin) {
      this.getlist();
    }
  }

  getlist() {
    this.items = this.af.database.list('/users/' + this.auth.currentUser.uid);
  }

  fbLogin() {
    this.auth.fbLogin()
      .subscribe((data) => {
        this.getlist();
        this.loginForm = this.builder.group({
          email: new Control('', Validators.required),
          password: new Control('', Validators.required)
        });
      },
      (err) => {
        console.error(err);
        alert('登入失敗!');
        this.isLogin = this.auth.isLogin;
      }, () => {        
        this.isLogin = this.auth.isLogin;
      });      
  }

  login() {
    this.auth.login(this.loginForm.value)
      .subscribe((data) => {
        this.getlist();
        this.loginForm = this.builder.group({
          email: new Control('', Validators.required),
          password: new Control('', Validators.required)
        });
      },
      (err) => {
        console.error(err);
        alert('登入失敗!');
      }, () => {        
        this.isLogin = this.auth.isLogin;
      });
  }

  logout() {
    this.auth.logout();
    this.isLogin = this.auth.isLogin;
  }

  create() {
    this.regForm = this.builder.group({
      newData: new Control('')
    });
    this.formShowing = true;
  }

  save() {
    let promise;
    if (this.currentItem) {
      // update
      promise = this.items.update(this.currentItem.$key, { text: this.regForm.value.newData });
    }
    else {
      // new
      promise = this.items.push({ text: this.regForm.value.newData });
    }
    promise.then(() => {
      this.formShowing = false;
    })
  }

  edit(item) {
    this.regForm = this.builder.group({
      newData: new Control(item.text)
    });
    this.currentItem = item;
    this.formShowing = true;
  }
  delete(item) {
    this.items.remove(item.$key);
  }
}
