import { Component, Host, forwardRef, Inject } from '@angular/core';
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

import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { AuthService } from './shared';
import { KeepComponent } from './+keep';
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
    MdRadioDispatcher
  ]
})
@Routes([
  { path: '/profile', component: ProfileComponent },
  { path: '/', component: KeepComponent },
])
export class KeepthingsAppComponent {

  isLogin: boolean = false;

  views: Object[] = [
    {
      name: "Keep",
      description: "Find your soulmate!",
      icon: "pets",
      link: "/"
    },
    {
      name: "Profile",
      description: "Edit my account information",
      icon: "assignment ind",
      link: "/profile"
    },

  ];
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.isLogin = this.auth.isLogin;
  }

  fbLogin() {
    this.auth.fbLogin()
      .subscribe((data) => {
      },
      (err) => {
        console.error(err);
        alert('登入失敗!');
        this.isLogin = this.auth.isLogin;
      }, () => {
        this.isLogin = this.auth.isLogin;
      });
  }

  logout() {
    this.auth.logout();
    this.isLogin = this.auth.isLogin;
  }
}
