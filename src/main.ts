import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { KeepthingsAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(KeepthingsAppComponent,
  [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://keepthings.firebaseio.com'),
    HTTP_PROVIDERS
  ]);

