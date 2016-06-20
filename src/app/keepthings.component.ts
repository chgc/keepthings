import {
  Component, Host, forwardRef, Inject,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, Validators } from '@angular/common';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { AuthService } from './shared';
import { KeepComponent } from './+keep';
import { ProfileComponent } from './+profile';




@Component({
  moduleId: module.id,
  selector: 'keepthings-app',
  templateUrl: 'app/keepthings.component.html',
  styleUrls: ['app/keepthings.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdIcon,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  providers: [
    MdIconRegistry
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
    this.auth.checkLogin.subscribe((isLogin) => {
      this.isLogin = isLogin;
    })
  }

  fbLogin() {
    this.auth.fbLogin()
      .subscribe((data) => {
      },
      (err) => {
        console.error(err);
        alert('登入失敗!');
      }, () => {
      });
  }

  logout() {
    this.auth.logout();
  }
}
