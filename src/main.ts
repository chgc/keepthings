import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { KeepthingsAppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS }  from '@angular/router';
import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire } from 'angularfire2';
import { AuthService } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(KeepthingsAppComponent,
  [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://keepthings.firebaseio.com'),
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AuthService
  ]);
