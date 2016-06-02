import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { KeepthingsAppComponent } from '../app/keepthings.component';

beforeEachProviders(() => [KeepthingsAppComponent]);

describe('App: Keepthings', () => {
  it('should create the app',
      inject([KeepthingsAppComponent], (app: KeepthingsAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
