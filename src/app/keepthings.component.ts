import { Component } from '@angular/core';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, Validators } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';



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
    FORM_DIRECTIVES
  ],
  providers: [
    MdIconRegistry, MdRadioDispatcher
  ]
})
export class KeepthingsAppComponent {
  formShowing = false;
  title = 'keepthings!';
  regForm: ControlGroup;
  loginForm: ControlGroup;
  currentItem: any;
  isLogin: boolean = false;
  loginUser: string = '';

  items: FirebaseListObservable<any[]>;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    },
    {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets"
    }
  ];
  constructor(private af: AngularFire, private builder: FormBuilder) {
    // 
    this.loginForm = this.builder.group({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required)

    })
  }

  login() {
    this.af.auth.login(this.loginForm.value)
      .then((data) => {
        console.log('login: ', data);
        this.loginUser = data.uid;
        this.items = this.af.database.list('/users/' + this.loginUser);
        this.isLogin = true;
        this.loginForm = this.builder.group({
          email: new Control('', Validators.required),
          password: new Control('', Validators.required)
        });
      })
      .catch((err) => {
        console.log(err);
        alert('登入失敗!');
        this.isLogin = false;
      });
  }

  logout() {
    this.af.auth.logout();
    this.loginUser = "";
    this.isLogin = false;
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
