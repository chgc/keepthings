import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { KeepthingsAppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import {FIREBASE_PROVIDERS, 
  defaultFirebase, 
  AngularFire, 
  AuthMethods, 
  AuthProviders, 
  firebaseAuthConfig} from 'angularfire2';


if (environment.production) {
  enableProdMode();
}

bootstrap(KeepthingsAppComponent,
  [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://keepthings.firebaseio.com'),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }),
    HTTP_PROVIDERS
  ]);

